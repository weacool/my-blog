import {Link } from 'react-router-dom';


const HomePage = () => {

    function MyButton()  {

        return (
            <Link to="/ChopSticks">
            <button 
            className = "buttoncss1"
            >
                ChopSticks
            </button>
            </Link>
        )
    }


    return (
        <div>

        <MyButton />
        <h1 className = "title">
          Something is cooking here
        </h1>
        <h2>
          Portfolio
        </h2>
        <p>
        Cooking up something so that my career has a future yay
        </p>
  
        
      </div>
    );

    

};

export default HomePage;