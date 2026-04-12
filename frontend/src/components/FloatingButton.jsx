import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FloatingButton() {
    const navigate = useNavigate();
  return (
    <button className="home_fab" onClick={() => navigate("/createpost")}>
      <Plus size={32}/>
    </button>
  );
}

export default FloatingButton;