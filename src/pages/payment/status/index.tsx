import { ArrowBackRounded, CheckCircleRounded, SmsFailed } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader, Link, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './Payment.module.scss'
async function checkPaymentStatus(billId: any) {
    const response = await fetch(`/api/paypal/status?id=${billId}`);

    const data = await response.json();

    if (data.success) {
        return data.status;
    } else {
        throw new Error(data.message);
    }
}

export default function Status() {
    const { query } = useRouter()
    console.log({query});
    
    // const [status, setStatus] = useState(false);
    // const { InvId, OutSum, CurrencyIn, custom, } = query
    const { InvId, OutSum, CurrencyIn, custom,Commission, TrsId, Status, SignatureValue} = {
        "InvId": 123,
        "OutSum": 12345,
        "CurrencyIn": "RUB",
        "Commission": 123,
        "TrsId": "AbxvAM6vJk",
        "Status": "SUCCESS",
        "custom": "custom_information",
        "SignatureValue": "KWE3FDF98UEWMS7733SWQWPCPL1LA10Y"
    }
    useEffect(() => {
        // (async ()=> setStatus(await checkPaymentStatus(InvId)))();
    }, [])
    return (
        <>
            <Head>
                <title>СТАТУС ПЛАТЕЖА</title>
            </Head>
            <div className={styles.container}>
                <Card>
                    <CardHeader>
                            идентификатор счета-фактуры: { InvId }
                    </CardHeader>
                    <CardContent>
                        <Typography>
                            Статус: { Status == "SUCCESS" ?  <CheckCircleRounded color="success" /> : <CheckCircleRounded color="error" />  }
                        </Typography>
                        <Typography>
                            Пользовательская информация: { custom }
                        </Typography>
                        <Typography>
                            идентификатор счета-фактуры: { InvId }
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href="/">
                            <ArrowBackRounded />
                        </Link>
                    </CardActions>
                </Card>
            </div>
        </>
    );
}