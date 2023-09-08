import React, { useState } from 'react';
import '../CSS/Vaccination.css';
import { BsSave, BsWhatsapp } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import html2canvas from 'html2canvas';
import {jsPDF }from 'jspdf';

const Share=({show})=>{
    const[copyText, setCopyText]=useState("Copy link")

    const handleCopyLink=()=>{
        navigator.clipboard.writeText(document.location.href);
        setCopyText("Copied");
        setTimeout(() => {
          setCopyText("Copy link");
        }, 2000);
    }

    const handleSave=()=>{
        const card=document.querySelector('.vaccinationWrapper');
        html2canvas(card).then((canvas)=>{
            const data = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const docWidth= doc.internal.pageSize.getWidth();
            const docHeight= doc.internal.pageSize.getHeight();
            doc.addImage(data, 'PNG', 0, 0, docWidth, docHeight);
            doc.save('Pet Health Card.pdf');
        })
    }

    return(
        <div className='sharePannel' style={{opacity: show ? "1":"0"}}>
            <button type='button' title="Copy" onClick={handleCopyLink}>
                <div>
                    <MdContentCopy/> &nbsp; {copyText}
                </div>
            </button>
            <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?text=${"Hey, Check out my dog's vaccinations:"} ${document.location.href}`}>
                <div> 
                    <BsWhatsapp/> &nbsp; Share
                </div>
            </a>
            <button type='button' onClick={handleSave}>
                <div> 
                    <BsSave/> &nbsp; Save as pdf
                </div>
            </button>
        </div>
    )
}

export default Share;