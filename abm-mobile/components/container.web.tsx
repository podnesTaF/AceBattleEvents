import Head from 'expo-router/head'
import React from 'react'
import "./style.css"

const Page = () => {
  return (
    <>
        <Head>
            <title>Cold Page </title>
        </Head>
        <h2>Drawer 1 web</h2>
        <div className='container'>
            <span style={{color: '#fff'}}>I'm a container</span>
        </div>
    </>
  )
}

export default Page