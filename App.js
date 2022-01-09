import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import CurrentPrice from "./src/components/CurrentPrice";
import HistoryGraphic from "./src/components/HistoryGraphic";
import QuotationsList from "./src/components/QuotationsList";
import QuotationItem from "./src/components/QuotationsList/QuotationItem";

function addZero(number) {
    if (number <= 9) {
        return "0" + number;
    }
    return number;
}

function url(qtdDays) {
    const date = new Date();
    console.log(date.getDay());
    const listLastDays = qtdDays;
    const endDate = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDay())}`;
    date.setDate(date.getDate() - listLastDays)
    const startDate = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDay())}`;
    console.log(startDate, listLastDays)
    return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
}

async function getListCoin(url) {
    let response = await fetch(url);
    let returnApi = await response.json();
    let selectListQuotations = returnApi.bpi;
    const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
        return {
            data: key.split('-').reverse().join('/'),
            value: selectListQuotations[key]
        }
    })
    return queryCoinsList.reverse();
}

async function getPriceCoinsGraphic(url) {
    let responseG = await fetch(url);
    let returnApiG = await responseG.json();
    let selectListQuotationsG = returnApiG.bpi;
    return Object.keys(selectListQuotationsG).map((key) => {
        return selectListQuotationsG[key]
    });
}

export default function App() {
    const [coinsList, setCoinsList] = useState([]);
    const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
    const [days, setDays] = useState(30);
    const [updateData, setUpdateData] = useState(true);

    function updateDay(number) {
        setDays(number);
        setUpdateData(true);
    }

    useEffect(() => {
        getListCoin(url(days)).then(data => {
            setCoinsList(data);
        })

        getPriceCoinsGraphic(url(days)).then( dataG => {
            setCoinsGraphicList(dataG);
        })

        if(updateData){
            setUpdateData(false);
        }
    }, [updateData])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor="#f50d41" barStyle="dark-content"/>
            <CurrentPrice/>
            <HistoryGraphic/>
            <QuotationsList filterDay={updateDay} listTransactions={coinsList}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 40 : 0
    },
});
