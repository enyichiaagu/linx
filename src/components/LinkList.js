import React from 'react'
import Link from '../components/Link'

function LinkList({ options, links, notClickable }) {
    return (
        <div>
            {
                links.map((link) => (
                    <Link 
                        key={link._id}
                        id={link._id} 
                        title={link.title} 
                        url={link.url} 
                        options={options ? true : false}
                        notClickable={notClickable ? true: false}
                    />
                ))
            }
        </div>
    )
}

export default LinkList
