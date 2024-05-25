import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../Data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

  const {videoId} = useParams();

  const[apiData, setApiData] = useState(null);
  const[otherData, setOtherData] = useState(null)
  const[commentData, setCommentData] = useState([])

  const fetchVideData = async () => {
    const videoData_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    await fetch(videoData_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
  }

  const fetchOtherData = async () => {
    const otherData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    await fetch(otherData_url).then(response=>response.json()).then(data=>setOtherData(data.items[0]));

    const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`    
    await fetch(commentData_url).then(res=>res.json()).then(data=>setCommentData(data.items))
  }



  useEffect(()=>{
    fetchVideData();
  },[videoId])

  useEffect(()=>{
    fetchOtherData();
  },[apiData])
  

  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="Stray Kids &quot;아니 (Any)&quot; Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData?apiData.snippet.title : "Title here"}</h3>
      <div className="play-video-info">
        <p>{apiData?value_converter(apiData.statistics.viewCount):"16l"} views &bull;{apiData?moment(apiData.snippet.publishedAt).fromNow():"Nothing"}</p>
        <div className='button-group'>
          <span><img src={like}/>125</span>
          <span><img src={dislike}/>2</span>
          <span><img src={share}/>share</span>
          <span><img src={save}/>Save</span>
          </div>          
        </div>
        
        <hr />
        <div className="publisher">
          <img src={otherData?otherData.snippet.thumbnails.default.url:"Channel data"} alt='' />
          <div>
            <p>{apiData?apiData.snippet.channelTitle:"channel title"}</p>
            <span>{otherData?value_converter(otherData.statistics.subscriberCountS):""}</span>
          </div>
          <button>Subscribe</button>
          </div>

          <div className="vid-description">
            <p>{apiData?apiData.snippet.description.slice(0, 250):"Description"}</p>
            <hr/>
            <h4>{apiData?value_converter(apiData.statistics.commentCount):"102"}<span> comments</span></h4> 
            {commentData?commentData.map((item, index)=>{
              return(
                <div key={index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} />
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>                            
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} />                
                </div>
                </div>
              )
            }):''}       
            </div>          
    </div>
  )
}

export default PlayVideo
