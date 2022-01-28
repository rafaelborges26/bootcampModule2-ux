import React from 'react'

import { fireEvent, render } from '@testing-library/react'
import ListaDeUsuarios from './ListaDeUsuarios'

describe("Testing list of users", () => {

    it("Should render open modal Payment", () => {
        const { container, getByText } = render(<ListaDeUsuarios />)

        const ButonPay = getByText("Pagar");

        fireEvent.click(ButonPay);

        expect(container).toBeInTheDocument()
    })

    it("Should render open and close modal Payment", () => {
        const { container, getByText } = render(<ListaDeUsuarios />)

        const ButonPay = getByText("Pagar");

        fireEvent.click(ButonPay);

        const ButonCancel = getByText("Cancelar");

        fireEvent.click(ButonCancel);

        expect(container).toBeInTheDocument()
    })
})


