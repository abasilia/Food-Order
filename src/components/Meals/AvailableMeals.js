import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";




const AvailableMeals = () => {

  const [meals, setMeals]=useState([]);
  const [isLoading, setIsLoading]=useState(true);
  const [httpError, setHttpError]=useState(null);

  useEffect(()=>{
    const fetchMeals = async ()=>{
      
      const responce = await fetch('https://my-learning-project-97377-default-rtdb.firebaseio.com/meals.json');

      if (!responce.ok){
        throw new Error('Something went wrong!');
      }

      const responceData = await responce.json();

      const loadedMeals=[];

      for (const key in responceData) {
        loadedMeals.push({
          id: key,
          name: responceData[key].name,
          description: responceData[key].description,
          price: responceData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
      
    };
  
    fetchMeals().catch(error=>{
      setIsLoading(false);
      setHttpError(error.message);
    });
   
    
      
    
  },[]);

  if(isLoading) {
    return (
      <section className={classes.MealIsLoading}>
        <p> Loading ...</p> 

      </section>

    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
