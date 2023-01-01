import { getByRole, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth"
import { AppRouter } from "../../src/router/AppRouter"

describe('Pruebas en AppRouter.jsx', () => { 
    

    test('Debe de mostrar el login si no está autenticado', () => {

        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );


        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('Debe de mostrar el componente de marvel si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Willy Antunez'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const h1 = screen.getByRole('heading', {level: 1});

        expect(h1.innerHTML).toBe('Marvel Comics');
        expect(screen.getByText('Willy Antunez')).toBeTruthy();

    });

});