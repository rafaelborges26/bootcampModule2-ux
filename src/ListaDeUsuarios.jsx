import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import './listadeusuarios.css';
import { FiX, FiDollarSign } from 'react-icons/fi'
import axios from 'axios';

//Pegando as informações da API pelo GET
export const ListaDeUsuarios = () => {
    const [infos, setInfos] = useState([])
    useEffect(() => {
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
            method: 'GET',
        }).then((resposta) => {setInfos(resposta.data)})
    }, [])

// Mock com lista de cartões para teste
const cards = [
    // cartão válido
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // cartão inválido
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
];

// Função para pegar a escolha do cartão do input select
const escolhaDoCartao = (event) => {
    setValorCartao(event.target.value);
}

// Ações dos modals
const [abrirPagamento, setAbrirPagamento] = useState("none"); // Para abrir modal de pagamento
const [pegarUsuario, setPegarUsuario] = useState(""); // Para pegar o nome do usuário
const [abrirPagou, setAbrirPagou] = useState("none"); // Para abrir modal com recibo de pagamento
const [abrirSaldoInsuficiente, setAbrirSaldoInsuficiente] = useState("none"); // Para abrir modal saldo insuficiente

const [abrirNaoRecebeu, setAbrirNaoRecebeu] = useState(""); // Para msg de erro de pagamento
const [valorCartao, setValorCartao] = useState("1"); // Para pegar o cartão escolhido para pagamento
const [valorDinheiro, setValorDinheiro] = useState(""); // Para pegar o valor de pagamento digitado
const [validarCampo, setValidarCampo] = useState("none"); // Para validar campo de valor digitado
const [modalPayIsOpen, setModalPayIsOpen] = useState(false)
const [totalSaldo, setTotalSaldo] = useState(5000)

const decrementarTotal = (valor) => {
    const newTotal = totalSaldo - valor

    if(newTotal >= 0) {
        setTotalSaldo(newTotal)
    }
    
}

// Função para abrir o modal de pagamento do usuário
const abrirModalPagar = (name) => {
    setAbrirPagamento("flex")
    setPegarUsuario(name)
    setModalPayIsOpen(true)
}

const fecharModalPagar = () => {
    setAbrirPagamento("none")
    setPegarUsuario("")
    setModalPayIsOpen(false)
}

const ReceberDinheiro = () => {
    const total = totalSaldo + 5000
    setTotalSaldo(total)
    console.log(totalSaldo, "total")
}


// Função que abre o modal de recibo de pagamento 
const abrirModalPagou = () => {
    if (valorDinheiro === "") {
        setValidarCampo("flex");
    } else 
        {
        if (valorCartao === "1") {
            setAbrirNaoRecebeu("");
            const valorNumber =  Number(valorDinheiro.replace(/[^0-9]/g, ''))

            decrementarTotal(valorNumber)
            console.log(valorDinheiro)

            if(valorNumber > totalSaldo) {
                setAbrirSaldoInsuficiente('flex');
            }

        } else {
            setAbrirNaoRecebeu("não");
        }
        setAbrirPagamento("none");
        setAbrirPagou("flex");
        setValorDinheiro("");
        setValidarCampo("none");
    }
}

// Função para fechar o modal do recibo de pagamento
const fecharModal = () => {
    setAbrirPagou("none");
    setModalPayIsOpen(false)
    setAbrirSaldoInsuficiente("none")
}

// Função para validar campo de valor para pagamento do usuário
const valorInput = (event) => {
    setValorDinheiro(event.target.value);
    setValidarCampo("none");
}

// Renderizando na tela as informações recebidas da API 
    return (
        <main >
        <header>
            <button onClick={ReceberDinheiro} >
                <FiDollarSign/>
                Receber
            </button>
            <h3>
            Lista de usuários
            </h3>

            <p>Saldo: R$ {totalSaldo}</p>
        </header>
        
        <div className={`containerMain-${modalPayIsOpen ? 'open' : ''}`} id="containerMain"  onClick={ () => { abrirPagamento === 'flex' && fecharModalPagar()} } >
            {infos.map(item => (
                <div className="container" key={item.index} >
                    <div className="content">
                        <img className="thumbnail" src={item.img} alt="Foto do usuário" />
                        <div className="infos" data-testid="buttonPay">   
                            <p>{item.name}</p>
                            <p>Username: {item.username}</p>
                        </div>
                        <button onClick={()=>{abrirModalPagar(item.name)}}>Pagar</button>
                    </div>
                </div>
            ))}
            </div>

            {/*--------------------------------Abrir Modal de pagamento----------------------------------*/}
            <div className="abrirModal" style={{display: abrirPagamento}} data-testid="ModalPayment">
                <div className="cabecalho-modal">
                    <p className="texto-cabecalho-modal">Pagamento para <span>{pegarUsuario}</span></p>
                    <div className="closeModal">
                    <FiX onClick={fecharModalPagar} />
                </div>    
                </div>
                
                <div className="modal-body">
                <div className="valorInput">
                <NumberFormat value={valorDinheiro} onChange={valorInput} prefix={'R$ '} inputMode="numeric" placeholder="R$ 0,00"/>
                <p style={{display:validarCampo}}>Campo obrigatório</p>
                </div>
                <select value={valorCartao} onChange={escolhaDoCartao}>
                <option value="1">Cartão com final {cards[0].card_number.substr(-4)}</option>
                <option value="2">Cartão com final {cards[1].card_number.substr(-4)}</option>
                </select>
                <div className="container-button">
                <button id="button-cancelar" onClick={fecharModalPagar}>Cancelar</button>
                <button id="button-pagar" onClick={()=>{abrirModalPagou ()}}>Pagar</button>
                </div>
                </div>
            </div>  

            {/*------------------------------Abrir Modal de recibo de pagamento--------------------------------*/}
            <div className="abrirModal" id={ abrirNaoRecebeu ? `modalNaoConcluido` : `modalConcluido`} style={{display: abrirPagou}} data-testid="ModalFinished" >
                <p className="texto-cabecalho-modal">Recibo de pagamento</p>
                <p>O Pagamento <b>{abrirNaoRecebeu}</b> foi concluído com sucesso</p>
                <button onClick={()=>{fecharModal()}}>Fechar</button>
            </div>

            <div className="abrirModal" style={{display: abrirSaldoInsuficiente}} >
                <p className="texto-cabecalho-modal">Saldo insuficiente</p>
                <p>Você não possuí saldo suficiente para realizar este pagamento</p>
                <button onClick={()=>{fecharModal()}}>Fechar</button>
            </div>

            
            
            </main>
    )
}

//export default ListaDeUsuarios