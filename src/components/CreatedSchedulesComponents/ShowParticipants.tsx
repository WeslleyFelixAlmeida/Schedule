import style from "./ShowParticipants.module.css";
import ShowParticipantsListUnique from "./ShowParticipants/ShowParticipantsListUnique";
import ShowParticipantsListMultiple from "./ShowParticipants/ShowParticipantsListMultiple";

type ShowParticipants_props = {
    currentEventData: {
        id: number
        type: "MULTIPLE" | "UNIQUE";
    };
    setShowParticipants: Function;
}

const ShowParticipants = (props: ShowParticipants_props) => {
    const hideParticipantsContainer = () => {
        props.setShowParticipants(false);
    }

    return (
        <div className={style.showParticipantsPage}>
            <button onClick={hideParticipantsContainer}>Voltar</button>
            {props.currentEventData.type === "UNIQUE" &&
                <ShowParticipantsListUnique eventId={props.currentEventData.id} />
            }

            {props.currentEventData.type === "MULTIPLE" &&
                <ShowParticipantsListMultiple eventId={props.currentEventData.id} />
            }
        </div >
    )
}

export default ShowParticipants;