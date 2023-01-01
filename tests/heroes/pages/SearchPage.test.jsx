import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({ 
   ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en SearchPage', () => { 

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente con valores por defecto', () => {
        const container = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
    
    test('Debe de mostrar a batman y el input con el valor del querie string', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('batman');

        const noHeroes = screen.getByLabelText('no-results');
        expect(noHeroes.getAttribute('style')).toContain('display: none;')

    });

    test('Debe de mostrar un error si no se encuentra el hero', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=esteheroenoexisteniexistirajamas123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const noHeroes = screen.getByLabelText('no-results');

        expect(noHeroes.style.display).toBe('')
    });

    test('Debe de llamar el navigate a la pantalla nueva', () => {
        render(
            <MemoryRouter >
                <SearchPage />
            </MemoryRouter>
        );

        const searchValue = 'batman 123'

        const searchButton = screen.getByLabelText('search-button');
        const searchInput = screen.getByRole('textbox');

        fireEvent.change(searchInput, {target: {value: searchValue, name: 'searchText'}})

        fireEvent.click(searchButton); 

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${searchValue}`)
    });

});