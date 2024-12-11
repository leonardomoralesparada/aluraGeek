const enlace = "http://localhost:3000/Productos";

const products = async() => {
    try {
        const convertida = await  fetch(enlace);
        const convertida2 = await convertida.json();
        return convertida2;
    } catch (error) {
        console.log(error);
    }
}

const createProduct = async (titulo, presio, imagen,id) => {
    try {
      const response = await fetch(enlace, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo, presio, imagen, id }),
      });
  
      const data = await response.json();
      console.log("Solicitud POST exitosa:", data);
      return data;
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${enlace}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`Producto con id ${id} eliminado exitosamente`);
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };

export const api = {
    products,createProduct,deleteProduct
}