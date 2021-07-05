
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import mealsImage from '../../assets/toa-heftiba-rD2x2By-boU-unsplash.jpg';


const Header=(props)=>{
    return <div>
    <header className={classes.header}>
        <h1>Tasty Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
    </header>

    <div className={classes['main-image']} >
        <img src={mealsImage} alt='A table full of food'/>
    </div>
    </div>
};

export default Header;