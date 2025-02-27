let url = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("justify").addEventListener("click", () => {
        document.querySelector(".modal").style.display = "block";
        document.getElementById("justify").style.display = "none";
    });

    document.getElementById("close").addEventListener("click", () => {
        document.querySelector(".modal").style.display = "none";
        document.getElementById("justify").style.display = "block";
    });
   
   let checkboxes= document.querySelectorAll("input[type='checkbox']");
   checkboxes.forEach((checkbox)=>{
    checkbox.addEventListener("change",()=>{
      if(checkbox.checked){
       bodyLoad(`https://fakestoreapi.com/products/category/${checkbox.name}`)
      }
      else{
       bodyLoad(url); 
      }
    })
   }) 
   document.getElementById("women").addEventListener("click",(e)=>{
    womens();
   })
   document.getElementById("mens").addEventListener("click",()=>{
    mens();
   })
   function womens(){
    bodyLoad(`https://fakestoreapi.com/products/category/women's clothing`) 
   } 
   function mens(){
    bodyLoad(`https://fakestoreapi.com/products/category/men's clothing`) 
   } 
   let sort=document.getElementById("sorted");
   sort.addEventListener("click",()=>{
    console.log(sort)
    if(sort.classList.contains("fa-sort-alpha-desc")){
      sort.classList.remove("fa-sort-alpha-desc");
      sort.classList.add("fa-sort-alpha-asc")
      bodyLoad(url, "asc")
     }
     else{
      sort.classList.remove("fa-sort-alpha-asc");
      sort.classList.add("fa-sort-alpha-desc");
      bodyLoad(url, "desc")
     }  
   })
   document.getElementById("products").addEventListener("change",(e)=>{
    if(e.target.value==="womens"){
      document.getElementById("error").innerText="" 
      bodyLoad("https://fakestoreapi.com/products/category/women's clothing");
    }
    else if(e.target.value==="mens"){
      document.getElementById("error").innerText="" 
      bodyLoad("https://fakestoreapi.com/products/category/men's clothing"); 
    }
    else if(e.target.value==="electronics"){
      document.getElementById("error").innerText="" 
      bodyLoad("https://fakestoreapi.com/products/category/electronics"); 
    }
    else if(e.target.value==="jewelery"){
      document.getElementById("error").innerText="" 
      bodyLoad("https://fakestoreapi.com/products/category/jewelery"); 
    }
    else{
     document.getElementById("error").innerText="Product Not Found" 
    }
   })
    let urlparam= new URLSearchParams(window.location.search);
    let category=urlparam.get("key");
    if(category==="mens"){
      bodyLoad(`https://fakestoreapi.com/products/category/men's clothing`) 
    }
    else if(category==="womens"){
      bodyLoad(`https://fakestoreapi.com/products/category/women's clothing`)   
    }
    else if(category==="electronics"){
      bodyLoad(`https://fakestoreapi.com/products/category/electronics`) 
    }
    else if(category==="jewelery"){
      bodyLoad(`https://fakestoreapi.com/products/category/jewelery`) 
    }
    else{
      bodyLoad(url); 
    } 
    function bodyLoad(url, filter = "") {
        fetch(url)
            .then(response => response.json())
            .then(products => {
                if (filter === "price") {
                    products.sort((a, b) => a.price - b.price);
                } else if (filter === "rating") {
                    products.sort((a, b) => b.rating.rate - a.rating.rate);
                }
                else if(filter === "asc"){
                 products.sort((a, b)=> a.title.localeCompare(b.title)) 
                }
                else if(filter === "desc"){
                  products.sort((a, b)=> b.title.localeCompare(a.title)) 
                }

                document.getElementById("counts").innerHTML = `${products.length}`;
                // Clear previous cards
                document.getElementById("card").innerHTML = "";

                products.forEach(product => {
                    let div = document.createElement("div");
                    div.innerHTML = `
                        <img onclick="getDetails(event)" id=${product.id} src="${product.image}" width="180px" height="180px" />
                        <h3 id="p-title">${product.title}</h3>
                        <h4>&#36;${product.price}</h4>
                        <span id="fav">&#9825;</span>
                         <span id="star">${product.rating.rate} <span></span>&#42;</span>
                        <button class="cart-btn" onclick="addToCart(event)" id=${product.id}>Add To Cart</button>
                    `;
                    div.style.cursor="pointer"
                    document.getElementById("card").appendChild(div);
                });
            });
    }

    bodyLoad(url);

    document.querySelector("select").addEventListener("change", (e) => {
      changeType(e.target.value)
    });

    function changeType(type) {
        if (type === "price") {
            bodyLoad(url, "price");
        } else if (type === "rating") {
            bodyLoad(url, "rating");
        } else {
            bodyLoad(url);
        }
    }
});
let count="";
function addToCart(e){
 count ++;
 document.querySelector(".badge").textContent=count;
}
function getDetails(e){
  let detail=document.createElement("div");
  detail.innerHTML=parseInt(e.target.id);
  window.location.href=`Cart_details.html?id${e.target.id}`
 
}
