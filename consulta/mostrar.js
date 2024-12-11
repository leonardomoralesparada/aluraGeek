import {api} from "./Conexion.js"

const product = document.querySelector("[data-product]");
const form = document.querySelector("[data-formulario]");

function crearCard (titulo,presio,imagen,icono,id) {
    const card = document.createElement("div");
    card.className = "card__main";
    card.innerHTML= `
                <img class="img__card" src=${imagen}  />
                <div class="card-container--info">
                  <p class="title">${titulo}</p>
                  <div class="card-container--value">
                    <p class="card__title">$${presio}</p>
                   <button class= "img__icono delete--id data-id=${id}">
                    <img>
                   </button>
                  </div>
                </div>`;

                addDeleteEvent(card,id)

                return card;
}

async function listarProducts () {

  const listApi = await api.products()

  listApi.forEach(Element => product.appendChild(crearCard(Element.titulo, Element.presio, Element.imagen, Element.icono, Element.id)))
}
    

listarProducts();

function addDeleteEvent(card,id) {
  const deleteButton = card.querySelector(".delete--id");
  deleteButton.addEventListener("click", async () => {
    try {
      await api.deleteProduct(id);
      card.remove();
      console.log(`Producto con id ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el producto con id ${id}:`, error);
    }
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-titulo]").value;
  const price = document.querySelector("[data-precio]").value;
  const image = document.querySelector("[data-imagen]").value;

  if (name === "" || price === "" || image === "") {
    alert("Por favor, complete todos los campos");
  } else {
    try {
      const newProduct = await api.createProduct(
        name,
        price,
        image
      );
      console.log("Producto creado:", newProduct);
      const newCard = crearCard(newProduct);
      productsContainer.appendChild(newCard);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }

    form.reset(); // Reinicia el formulario
  }
});