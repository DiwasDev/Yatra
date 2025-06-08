"use client"
import React, {useEffect} from 'react'
import {usePipeline} from "@/hooks/usePipeline";

function Page() {
    const generateEmbedding  = usePipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    useEffect(() => {

        if (!generateEmbedding) return;

        const makeEmbedding = async () => {
            const embedding = await generateEmbedding("Hello world", {
                pooling: 'mean',
                normalize: true,
            }).then((res) => console.log(res));
            console.log(embedding);
        }

        makeEmbedding().then((res) => console.log(res));
    }, [generateEmbedding])

    return (
        <div>Pages</div>
    )
}

export default Page
