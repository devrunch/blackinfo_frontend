import React, { useEffect } from 'react'

const Chatbot = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            window.botpressWebChat.init({
                botId: 'e9f9d586-80e2-45ea-88e1-81442805c42e',
                hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
                messagingUrl: 'https://messaging.botpress.cloud',
                clientId: 'e9f9d586-80e2-45ea-88e1-81442805c42e',
                themeName: "prism",
                frontendVersion: "v1",
                showPoweredBy: true,
                theme: "prism",
                themeColor: "#2563eb",
                useSessionStorage : true
            })
        }
    }, [])

    return <div id="webchat" />
}

export default Chatbot
