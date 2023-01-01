import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../src/ui/components/Navbar";

import { AuthContext } from "../../../src/auth/context";


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Pruebas en el Navbar', () => { 

    const user = {
        name: 'Willy Antunez',
        id: 'abcde'
    }

    test('El Navbar debe de mostrar el nombre de el usuario', () => {

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{user}}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByText(user.name)).toBeTruthy();
    });

    test('Debe de llamar logout y useNavigate con la informacion esperada', () => {
        const logoutMock = jest.fn()

        render(
            <MemoryRouter>
                <AuthContext.Provider value={ { user, logout: logoutMock } }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const logoutButton = screen.getByRole('button');

        fireEvent.click(logoutButton);

        expect(mockedUsedNavigate).toHaveBeenCalledWith('/login', {
            replace: true,
        });
        expect(logoutMock).toHaveBeenCalled();
    });

});