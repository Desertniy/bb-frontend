import React, {useContext, useState} from 'react';
import CustomModal from "../modalLogin/CustomModal";
import CustomInput from "../Modules/CustomInput/CustomInput";
import Button from "../Modules/Button/Button";
import LoginService from "../../routeService/LoginService";
import {AuthContext} from "../../context/AuthContext";

const CardBet = ({eventBet, visible, setVisible}) => {
    const [amountBet, setAmountBet] = useState(0)
    const [statusBet, setStatusBet] = useState(false)
    const {balance, setBalance} = useContext(AuthContext)

    async function fetchBet(){
        if (!isNaN(amountBet) && amountBet > 0) {
            const bet = {
                idUser: localStorage.getItem('id'),
                idLine: eventBet.line.idEventLine,
                amount: amountBet,
            }
            const res = await LoginService.addBetForEvent(bet)
            if (res != null){
                setVisible(false)
                setAmountBet(0)
                setBalance(balance-amountBet)
                setStatusBet(false)
            }
            else{
                setStatusBet(true)
            }

        }
        else {
            setStatusBet(true)
        }
    }

    return (
        <CustomModal visible={visible} setVisible={setVisible}>
            <h1>{eventBet?.nameEvent}</h1>
            <h2>Ставка на {eventBet?.team}</h2>
            <h3>Коэффициент: {eventBet?.line?.coef}</h3>
            <CustomInput value={amountBet} onChange={(e) => setAmountBet(e.target.value)} placeholder="Введите сумму"/>
            <Button onClick={() => fetchBet()}>Сделать ставку</Button>
            {statusBet ? <h3>Некорректная сумма</h3> : null}
        </CustomModal>
    );
};

export default CardBet;