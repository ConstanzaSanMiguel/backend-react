import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [prev, setPrev] = useState(null)
  const [next, setNext] = useState(null)
  useEffect(() => {
    axios("http://localhost:8080/api/products")
      .then((res) => {
        console.log(res.data.response)
        setProducts(res.data.response.docs)
        setPrev(res.data.response.prevPage)
        setNext(res.data.response.nextPage)
      })
      .catch((error) => console.log(error))
  }, [])

  function pagination(page) {
    axios(`http://localhost:8080/api/products?page=${page}`)
      .then((res) => {
        setProducts(res.data.response.docs)
        setPrev(res.data.response.prevPage)
        setNext(res.data.response.nextPage)
      })
  }

  return (
    <>
      <nav>
        <div className="navbar-nav menu">
          <a href="/"><img src="/vibelogo.png" id="vibelogo" alt="home vibe logo" className="hover logo" /></a>
          <ul className="navbar">
            <li><a href="#" className="hover" id="formButton">form</a></li>
            <li><a href="#" className="hover" id="ordersButton">orders</a></li>
            <li><a href="#" className="hover" id="registerButton">register</a></li>
            <li><a href="#" className="hover" id="loginButton">log in</a></li>
            <li>
              <form action="#" method="post"><button type="submit" className="hover"
                id="signout">sign out</button></form>
            </li>
          </ul>
        </div>
      </nav>

      <main className="index">
        <h1 className="index-title">Welcome to VIBE~!</h1>
        <div id="searchHolder">
          <input id="text" type="text" placeholder="Search your artist or album..." />
          <img id="search"
            src="https://st2.depositphotos.com/5266903/11962/i/450/depositphotos_119625986-stock-photo-zoom-stroke-glyph-icon.jpg" />
        </div>

        <section className="flex-grow-1 d-flex flex-row flex-wrap align-items-center p-3 my-2 w-100" id="productsContainer">
          {products.map((each) =>
            <div key={each._id} className="flex-grow-1 d-flex flex-wrap justify-content-evenly align-items-center">
              <a href="#" className="products card m-2">
                <img src={each.photo} id='albumPhotos' className="detailsProducts" alt="{each.photo} image" />
                <h5 className="detailsProducts card-title text-center fs-6 m-3">{each.title}</h5>
                <p> {each.description} </p>
              </a>
            </div>)}
        </section>

        <span className="w-100 " id="paginationButtons">
          {prev && <button onClick={() => pagination(prev)} className="btn btn-primary btn-sm button pagination"><span
            className="paginationText">Previous</span></button>}
          {next && <button onClick={() => pagination(next)} className="btn btn-primary btn-sm button pagination"><span
            className="paginationText">Next</span></button>}
        </span>

        <div className="index-cards">
          <div className="index-cards-details">
            <img src="https://www.shutterstock.com/image-vector/check-mark-icon-symbols-vector-600nw-1906113508.jpg"
              alt="tick" />
            <h4>100% AUTHENTIC</h4>
            <p>KPOP MERCH only sells official products.</p>
          </div>
          <div className="index-cards-details">
            <img src="https://comercialadvance.com/wp-content/uploads/2020/10/trasporteydistribucion.png"
              alt="shipping" />
            <h4>SAFE & FAST SHIPPING</h4>
            <p>Fast shipping in safe packaging and optimal ways.</p>
          </div>
          <div className="index-cards-details">
            <img src="https://cdn-icons-png.flaticon.com/512/8780/8780457.png" alt="headphones" />
            <h4>CUSTOMER SERVICE</h4>
            <p>Our Kpop master will respond quickly.</p>
          </div>
          <div className="index-cards-details">
            <img src="https://img.freepik.com/vector-premium/auricular-telefono-burbuja-discurso-icono-messenger-aislado-fondo-ilustracion-vectorial_230920-911.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1700697600&semt=ais"
              alt="phone" />
            <h4>CONTACT US</h4>
            <p>We support group purchases, review product requests, etc.</p>
          </div>
        </div>
      </main>

      <footer>
        <ul className='footer'>
          <li className='footerLink'>privacy policy</li>
          <li className='footerLink'>terms & conditions</li>
          <li>
            <p>COPYRIGHT © 2023 VIBE. ALL RIGHTS RESERVED.</p>
          </li>
        </ul>
        <div className="TOP">
          <a href="#vibelogo" className="TOP-top"><i className="TOP-top-font fas fa-arrow-up from-bracket"></i></a>
        </div>
      </footer>
    </>
  )
}

export default App
