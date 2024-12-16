import React from 'react'
import { useState } from 'react';
import jsonData from '../data.json';
import ShowModal from './ShowModal';
// import modall from 'modall';



function Dashboard() {

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (item) => {
    setSelectedCategory(item);
    setShowModal(true);
  };



  return (<>
    <div>
      <h2 className='categories'>Categories</h2>

      < div className='container'>
        <div className='row'>

          <ul>{jsonData.map((item) => (
            <li key={item.id} onClick={() => handleCategoryClick(item)}>
              {item.title}
              < img src={item.img} alt="will fix it" style={{ height: "30px", width: "35px" }} />
            </li>

          ))}

          </ul>
          {/* {showModal && <ShowModal 
              setShowModal={setShowModal} 
              category={selectedCategory}
            />} */}




          {showModal === true ? <ShowModal setShowModal={setShowModal} category={selectedCategory} /> : null}

        </div>

      </div>
    </div>
  </>
  )
}

export default Dashboard;





