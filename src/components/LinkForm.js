import React from 'react'
import Button from './Button'


function LinkForm({ editUrl, url, entry, forceTo, state, titleChange, urlChange, save }) {

    return (
        <div>
            <div>
                <p className="label">Title</p>
                <input 
                    type="text" 
                    defaultValue={
                        entry ? entry.title : state.title
                    }
                    onChange={entry ? null : titleChange}
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
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "1em"}}>
                <Button text="Cancel" type="no-bg" style={{marginRight: "1em"}} goto={forceTo ? forceTo : "/options"}/>
                <Button type="normal" text="Save" goto={forceTo ? forceTo : "/options"} onClick={save}/>
            </div>
        </div>
    )
}

export default LinkForm
