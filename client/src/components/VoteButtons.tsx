import { useState } from "react";
import './VoteButtons.css'

interface Props {
  noteId: number,
  token: string,
}

export default function VoteButtons(props) {
	const [activeBtn, setActiveBtn] = useState<"up" | "down" | null>(null); // 'up' or 'down'

	const handleUpvote = (e: Event) => {
		e.preventDefault();

    console.log("upvote pressed")
    if (activeBtn === 'up') {
      setActiveBtn(null)
    } else {
      setActiveBtn("up");
    }
	};

	const handleDownvote = (e: Event) => {
		e.preventDefault();

    console.log("downvote pressed")

    console.log("upvote pressed")
    if (activeBtn === 'down') {
      setActiveBtn(null)
    } else {
      setActiveBtn("down");
    }
	};

	return (
		<div className="upvotecontainer">
			<button className={`upvote ${activeBtn === "up" ? "active" : ""}`} onClick={handleUpvote}>
				^
			</button>
			<button
				className={`downvote ${activeBtn === "down" ? "active" : ""}`}
				onClick={handleDownvote}
			>
				v
			</button>
		</div>
	);
}
