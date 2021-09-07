import React, { useState } from 'react'
import Button from './Button'


function LinkForm({editUrl, url, entry, forceTo, state, titleChange, urlChange, save }) {
    const [ error, setError ] = useState('')
    const [ clicked, setClicked ] = useState(false)

    const handleSubmit = () => {
        setError('')
        if (state.title && (state.url.length > 5 || entry.url)) {
            setClicked(true);
            save()
        } else setError('Please fill in the fields correctly')
    }


    return (
        <div>
            <div>
                <p className="label">Title</p>
                <input 
                    type="text" 
                    defaultValue={
                        entry ? entry.title : state.title
                    }
                    onChange={titleChange}
                />
            </div>
            <div>
                <p className="label">URL</p>
                {
                    editUrl ?
                    <input type="text" defaultValue={url} onChange={urlChange}/>:
                    <p>{entry.url}</p>
                }
            </div>
            <p className="paragraph error">{error}</p>
            {
            !clicked ?
                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "1em"}}>
                    <Button text="Cancel" type="no-bg" style={{marginRight: "1em"}} goto={forceTo ? forceTo : "/options"}/>
                    <Button type="normal" text="Save" onClick={handleSubmit}/>
                </div> :
                <div style={{margin: '0 auto', width: 'fit-content'}}>
                    <div className="lds-dual-ring"></div>
                </div>
            }
        </div>
    )
}

export default LinkForm
