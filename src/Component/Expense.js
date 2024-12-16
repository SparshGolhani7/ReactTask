import React, { useState, useEffect } from 'react'
import jsonData from '../data.json';
import ShowModal1 from './ShowModal1';
// import modall from 'modall';
// import { PieChart } from 'react-minimal-pie-chart';
import { PieChart, Pie, Tooltip } from 'recharts';
import HighchartsReact from 'highcharts-react-official';     // added for second chart 10 dec
import Highcharts from 'highcharts';                        // added for second chart 10 dec
import { useFormik } from 'formik';                        // added for date filter 10 dec
import * as Yup from 'yup';                               // added for date filter 10 dec
import DatePicker from 'react-datepicker';               // added for date filter 10 dec      
import 'react-datepicker/dist/react-datepicker.css';    // added for date filter 10 dec
import moment from 'moment';                           // added for date filter 11 dec



function Expense() {

  const [showModal1, setShowModal1] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [arrForChart, setArrForChart] = useState([]);                  // added for chart 10 dec
  //  const [data ,setData] = useState([]);                           //
  //  const [arr1,setArr1] = useState([]);                           // added for chart 10 dec
  const [grandTotal, setGrandTotal] = useState(0);                  // added for total exp 09 dec
  let newArr = [];                                                 // added for totla exp on 09 dec
  const [filteredExpenses,setFilteredExpenses] = useState([]) ;   // added for filter date 11 dec
  const [expenseDisplay,setExpenseDisplay] = useState(null);     // added for filter date 11 dec
  const [filteredExpenses1,setFilteredExpenses1] = useState([])
  const [expenseDisplay1,setExpenseDisplay1] = useState(null);



  const validationSchema = Yup.object({                     // added for date filetr exp 10 dec from here to---
    startDate:Yup.date().required("startDate please"),
    endDate:Yup.date().required("one more--Date please"),
  });

  const formik = useFormik({                        
    initialValues:{
      startDate:null,
      endDate:null,
    },
    validationSchema,

    onSubmit:(values,{resetForm})=>{
      console.log(values);
      resetForm();
      
    }
  })                                                         // added for date filetr exp 10 dec to here.   


  const getCategoryTotal = (categoryTitle) => {
    try {
      const expenses = JSON.parse(localStorage.getItem(categoryTitle) || '[]');
      // console.log(expenses);
      return expenses.reduce((total, curr) => total + Number(curr.amount), 0);
    } catch (error) {
      console.error(`Error calculating total for ${categoryTitle}:`, error);
      return 0;
    }
  };


  useEffect(() => {
    let val1;
    jsonData.map((item) => {
      newArr.push(getCategoryTotal(item.title));


      //  {console.log(newArr)};

      const val = newArr.reduce((sum, curr) => {
        return sum + curr;
      })




      // setGrandTotal(val);
      val1 = val;
    })


    console.log(newArr);
    setGrandTotal(val1);
    setArrForChart(newArr);
    // setArr1(arr1);

  }, [])

  // for adding chart 10 December
  console.log(arrForChart);

  // console.log(arr1);


  const handleCategoryClick = (item) => {
    setSelectedCategory(item);
    setShowModal1(true);
  };

  //   function chart(){
  //     jsonData.map((item)=>{
  //       const data =[
  //         {name:item.title, value:getCategoryTotal(item.title)},
  //         {name:"google", value:arrForChart[1]},
  //         {name:"whatsapp", value:arrForChart[2]},
  //         {name:"chatGPT", value:arrForChart[3]},
  //         {name:"insta", value:arrForChart[4]},
  //         {name:"twitter", value:arrForChart[5]},
  //         {name:"telegram", value:arrForChart[6]},
  //         {name:"utube", value:arrForChart[7]},
  //       ]
  //       return data;

  //     })

  // }


  function chart() {
    //let data = [];
    let data = jsonData.map((item) => {
      return { name: item.title, value: getCategoryTotal(item.title) };
    })
    return data

  }

  const options = {     //added for sec chart from 108 to 129 10 dec
    title: {
      text: "Expense Chart"
    },
    /* creidts removde from here */
    // plotOptions:{
    //   pie:{
    //     showInLegend:true
    //   }
    // },
    series: [{
      type: 'pie',
      data: jsonData.map((item) => {
        return { name: item.title, y: getCategoryTotal(item.title), color: 'green' };
      }),
      innerSize: '20%'
    }]
  }
  console.log(options);


  // added for date showExp fun 10dec from here to ---
  // const showExp=()=>{
  //   jsonData.forEach((item)=>{
  //     const exp = JSON.parse(localStorage.getItem(item.title)|| [])
  //     console.log(exp);
  //   })

  const showExp = () => {
    if (formik.values.startDate && formik.values.endDate) {
      let expenses= [];
      jsonData.forEach((item) => {
        JSON.parse(localStorage.getItem(item.title)||"[]").forEach((expense) => expenses.push({...expense,category: item.title}))
      });
      
      const filtered = expenses?.filter((exp) => {
        const expenseDate = new Date(exp.date);
        console.log(expenseDate,"exp dat")
        return (
          expenseDate >= formik.values.startDate &&
          expenseDate <= formik.values.endDate
        );
        });
        

      setFilteredExpenses(filtered);
      
      

      setExpenseDisplay(
        <div>
          <h3>Filtered Expenses</h3>
          {filtered?.length > 0 ? (
            <ul>
              {filtered.map((expense, index) => (
                <li key={index}>
                  <strong>{moment(expense.date).format('DD-MM-YYYY')}</strong>: Rs{expense.amount} (
                  {expense.category})
                </li>
              ))}
            </ul>
          ) : (
            <p>No expenses found for the selected date range</p>
          )}
        </div>
      );
    } else {
      alert("Please select both start and end dates");
    }
  };



const showTodaysExpenses = () => {
  let expenses1 = [];
  const today = moment().startOf('day'); 
  

  jsonData.forEach((item) => {
    JSON.parse(localStorage.getItem(item.title) || "[]").forEach((expense) => {
      expenses1.push({ ...expense, category: item.title });
    });
  });

  const filtered1 = expenses1?.filter((exp) => {
    const expenseDate1 = moment(exp.date);
    return expenseDate1.isSame(today, 'day');
  });

  setFilteredExpenses1(filtered1);

  setExpenseDisplay1(
    <div>
      <h3>Today's Expenses</h3>
      {filtered1?.length > 0 ? (
        <ul>
          {filtered1.map((expense, index) => (
            <li key={index}>
              <strong>{moment(expense.date).format('DD-MM-YYYY')}</strong>: Rs{expense.amount} (
              {expense.category})
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found for today</p>
      )}
    </div>
  );
};


  


  return (<>
    <div>
      <h2 className='categories'>Categories</h2>

      <div className='container'>
        <div className='row'>



          <ul>{jsonData.map((item) => (
            <li key={item.id} onClick={() => handleCategoryClick(item)}>
              {item.title}
              < img src={item.img} alt="will fix it" style={{ height: "30px", width: "35px" }} />
              <br />
              <div className="expense-total">
                Rs{getCategoryTotal(item.title)}
              </div>
            </li>

          ))}

          </ul>
          {/* added 09 Dec for showimg total expense sum of all fields*/}
          <h4>Total exp = {grandTotal}</h4>


          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={chart()}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label="djw"
            />
            <Tooltip />
          </PieChart>

          <div><HighchartsReact highcharts={Highcharts} options={options} /></div> {/* second chart added with legend */}


          <form onSubmit={formik.handleSubmit}>
            <div>

              <label htmlFor='startDate'>StartDate</label>
              <DatePicker
              id='startDate'
              selected ={formik.values.startDate}
              onChange={(startDate)=>formik.setFieldValue("startDate",startDate)}
              onBlur={formik.handleBlur}
              dateFormat= 'dd-MM-yyyy'
              placeholderText='startDate'
              // className='form-control'
              />
              {formik.touched.startDate && formik.errors.startDate && (<div style={{color:'red'}}>{formik.errors.startDate}</div>)}
            </div>

            <div>
              <label htmlFor='endDate'>EndDate</label>
              <DatePicker
              id='endDate'
              selected={formik.values.endDate}
              onChange={(endDate)=>formik.setFieldValue("endDate",endDate)}
              onBlur={formik.handleBlur}
              dateFormat='dd-MM-yyyy'
              placeholderText='endDate'
              />
              {formik.touched.endDate && formik.errors.endDate && (<div style={{color:'red'}}>{formik.errors.endDate}</div>)}
            </div>

            {/* <div ></div>
            <button onClick={()=>showExp()} >Show expenses</button>
          </form> */}
                  <button type="button" onClick={()=>showExp()}>
           Show expenses </button>
           {expenseDisplay}
        </form>

          
          <button onClick={()=>showTodaysExpenses()}>Day exp</button>
          {expenseDisplay1}

        
       


          {/* {showModal && <ShowModal 
                setShowModal={setShowModal} 
                category={selectedCategory}
               />} */}

          {showModal1 === true ? <ShowModal1 setShowModal1={setShowModal1} category={selectedCategory} /> : null}

        </div>

      </div>
    </div>
  </>
  )
}

export default Expense;




