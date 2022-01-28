import React from 'react'

import { fireEvent, getByTestId, render } from '@testing-library/react'
import {ListaDeUsuarios} from './ListaDeUsuarios'
import assert from 'assert'

describe("Testing list of users", () => {

    it("Should render component", () => {
        const { container, getByText } = render(<ListaDeUsuarios />)

        const ButonPay = getByText("Pagar");

        fireEvent.click(ButonPay);

        expect(container).toBeInTheDocument()
    })

    it("Should render open and close modal Payment", () => {
        const { container, getByText, getByTestId } = render(<ListaDeUsuarios />)

        const ButonPay = getByText("Pagar");

        fireEvent.click(ButonPay);

        const ButonCancel = getByText("Cancelar");

        fireEvent.click(ButonCancel);

        const ModalPaymentDiv = getByTestId("ModalPayment")

        expect(container).toBeInTheDocument()
        expect(ModalPaymentDiv).toHaveStyle({
            display: 'none'
        })
    })

    it("Should render component open modal Payment and digit some value and payed", () => {
        const { container, getByText, getByPlaceholderText, getByTestId } = render(<ListaDeUsuarios />)

        const ButonPay = getByText("Pagar");

        fireEvent.click(ButonPay);

        const InputField = getByPlaceholderText('R$ 0,00')

        fireEvent.change(InputField,  { target: {value: 10} })

        const ButonConfirmPay = getByText("Pagar");

        fireEvent.click(ButonConfirmPay);

        const ModalFinished = getByTestId("ModalFinished");        

        expect(container).toBeInTheDocument()
        expect(ModalFinished).toHaveStyle({
            display: 'flex'
        })
    })

    it("Should render component open modal Payment and digit some value and payed and close modal", () => {
        const { container, getByText, getByPlaceholderText, getByTestId } = render(<ListaDeUsuarios />)

        const ButonPay = getByText("Pagar");

        fireEvent.click(ButonPay);

        const InputField = getByPlaceholderText('R$ 0,00')

        fireEvent.change(InputField,  { target: {value: 10} })

        const ButonConfirmPay = getByText("Pagar");

        fireEvent.click(ButonConfirmPay);

        const ButonCloseModal = getByText("Fechar");

        const ModalFinished = getByTestId("ModalFinished");

        fireEvent.click(ButonCloseModal);

        expect(container).toBeInTheDocument()
        expect(ModalFinished).toHaveStyle({
            display: 'none'
        })
    })
})


