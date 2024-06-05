import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
    const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

    const [data] = useState(db);
    const [carrito, setCarrito] = useState(carritoInicial);

    const CANTIDAD_MAXIMA = 5;

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    function agregarAlCarrito(item) {
        const existeItem = carrito.findIndex((guitar) => guitar.id === item.id);

        if (existeItem >= 0) {
            // Si el item ya existe en el carrito
            if (carrito[existeItem].cantidad >= CANTIDAD_MAXIMA) return;
            const nuevoCarrito = [...carrito];
            nuevoCarrito[existeItem].cantidad++;
            setCarrito(nuevoCarrito);
        } else {
            // Si el item no existe en el carrito
            setCarrito([...carrito, { ...item, cantidad: 1 }]);
        }
    }

    function eliminarDelCarrito(id) {
        const nuevoCarrito = carrito.filter((guitar) => guitar.id !== id);
        setCarrito(nuevoCarrito);
    }

    function incrementarCantidad(id) {
        const nuevoCarrito = carrito.map((guitar) => {
            if (guitar.id === id && guitar.cantidad < CANTIDAD_MAXIMA) {
                guitar.cantidad++;
            }
            return guitar;
        });
        setCarrito(nuevoCarrito);
    }

    function decrementarCantidad(id) {
        
        const nuevoCarrito = carrito.map((guitar) => {
            if (guitar.id === id && guitar.cantidad > 1) {
                guitar.cantidad--;
            }
            return guitar;
        });
        setCarrito(nuevoCarrito);
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    return (
        <>
            <Header 
                carrito={carrito} 
                eliminarDelCarrito={eliminarDelCarrito}
                incrementarCantidad={incrementarCantidad}
                decrementarCantidad={decrementarCantidad}
                vaciarCarrito={vaciarCarrito}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            setCarrito={setCarrito}
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">
                        GuitarLA - Todos los derechos Reservados
                    </p>
                </div>
            </footer>
        </>
    );
}

export default App;
