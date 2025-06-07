function ArtistCard({ bg, shadow, card }) {
    return (
        <div
            key={card.id}
            className={`flex items-center scale-90 md:scale-100 justify-center w-70 h-100 border-4 m-4`}
            style={{
                backgroundImage: `url(${card.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderColor: bg, 
                boxShadow: `10px 12px 0px 0px ${shadow}`, 
            }}
        >
        </div>
    );
}

export default ArtistCard;