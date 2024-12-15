import AllProducts from "./AllProducts";
import Categories from "./Categories";

const Home = ({searchItem}) => {
    return (
        <>

            <div className="d-flex category-and-product">
                <Categories></Categories>
                <AllProducts searchItem={searchItem}></AllProducts>
            </div>
        </>
    )
}

export default Home;