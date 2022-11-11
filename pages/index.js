import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";


function HomePage() {

    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});     // config.playlists

    React.useEffect(() => {
        service
            .getAllVideos() 
            .then((dados) => {
                console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {...playlists};
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist].push(video);
                    
                });

                setPlaylists(novasPlaylists);
            });       
    }, []);


    return (
        <>
            
            <div style={{
                display:"flex",
                flexDirection:"column",
                flex:1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={playlists} >
                    conteudo
                </Timeline>
            </div>

        </>
    );
}

export default HomePage

/*function Menu() {
    return (
        <div>
            Menu
        </div>
    );
}*/
const StyledHeader = styled.div`
        background-color: ${({theme})=> theme.backgroundLevel1};
        img{
            width:80px;
            height:80px;
            border-radius:50%;
        }
        .user-info{
            //margin-top: 50px;
            display:flex;
            align-items:center;
            width: 100%;
            padding: 14px 32px;
            gap: 16px;
        }
  `;
const StyledBanner=styled.div`
    background-color:blue ;
    background-image: url(${config.bj});
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner   />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.nome}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    );
}
function Timeline({ searchValue, ...props }) {
    //console.log("dentro do componente",props.playlists);
    const playlistsNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistsNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNomalized = video.title.toLowerCase();
                                const searchValueNomalized = searchValue.toLowerCase();
                                return titleNomalized.includes(searchValueNomalized)
                            })
                            .map((video) => {
                                return (
                                    <a key = {video.url}href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}