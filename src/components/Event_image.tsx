import schedule_img from "./../assets/imgs/img_teste.jpg";

type Event_imageProps = {
    width: string;
}

const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#efefef",
    borderRadius: "10px"
}


const Event_image = (props: Event_imageProps) => {
    return(
        <div style={containerStyle}>
            <img src={schedule_img} alt="Imagem do evento" style={props}/>
        </div>
    )
}

export default Event_image;