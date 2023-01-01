import { render, screen } from "@testing-library/react";

import { Routes, Route, MemoryRouter, Navigate } from "react-router-dom";
import { PublicRoute } from "../../src/router/PublicRoute";

import { AuthContext } from "../../src/auth";

describe('Pruebas en PublicRoute.jsx', () => { 

    test('Si no estoy autenticado debe de mostrar el children', () => {
        render(
            <AuthContext.Provider value={{logged: false}}>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta publica')).toBeTruthy();
    });

    test('Debe de navegar si está autenticado', () => {

        const contextValue = {
            logged: true, 
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        }

        render( 
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/login"]}>

                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta publica</h1>
                            </PublicRoute>
                        } />

                        <Route path='marvel' element={<h1>Ruta marvel</h1>} />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta marvel')).toBeTruthy();
    });

})