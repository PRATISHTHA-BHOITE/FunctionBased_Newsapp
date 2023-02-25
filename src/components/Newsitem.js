import React from 'react'

const Newsitem=(props)=> {
 
    let { title, description, imageUrl,newsUrl, author, date, source } = props;
    return (
    
      <div className="container my-3">
      <div className="card" >
  <img src={!imageUrl?"https://content.fortune.com/wp-content/uploads/2022/06/GettyImages-1342340441-e1654072113634.jpg":imageUrl}
   className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', Zindex:'1'}}>
   {source}</span>
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {!author? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }


export default Newsitem
