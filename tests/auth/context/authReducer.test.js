import { authReducer } from "../../../src/auth";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => { 
    
    test('Deber retornar el estado por defecto', () => {
        const estadoInicial = {
            logged: false,
            user: null
        };

        const reducer = authReducer(estadoInicial);

        expect(reducer).toEqual(estadoInicial);
    });

    test('Debe de (login) llamar el login', () => {
        const estadoInicial = {
            logged: false,
            user: null
        };

        const action = {
            type: types.login,
            payload: {
                id: 'ABC',
                name: 'Willy Antunez'
            }
        };

        const reducer = authReducer(estadoInicial, action);

        expect(reducer.logged).toBe(true);
        expect(reducer.user).toEqual({id: 'ABC', name: 'Willy Antunez'});
    });

    test('Debe de (logout) borrar el name del usuario y poner logged en false', () => {
        
        const estadoInicial = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Willy Antunez'
            }
        };

        const action = {
            type: types.logout
        };

        const reducer = authReducer(estadoInicial, action);

        expect(reducer.logged).toBe(false);
        expect(reducer?.user).toBeFalsy();
    });


});