import React,{useEffect,useContext,useState} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate} from 'react-router-dom';
import { PostContext} from '../../store/postContext';

function Posts() {

  const{app,db} = useContext(FirebaseContext)
  const[products,setProducts]= useState([])
  const navigate= useNavigate()
  const {postDetails,setPostDetails}= useContext(PostContext)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, 'products');
        const snapshot = await getDocs(productCollection);
        const allPost = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(allPost);
        console.log("allPost is:", allPost[1]); 
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">

      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div> 
        <div className="cards">

        { products.map(product=>{
        return <div
            className="card"  onClick={()=>{ setPostDetails(product);navigate('/viewPost')} }>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageURL} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9;{product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.date}</span>
            </div>
          </div> 
              })   }

        </div> 
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
