import React from "react";
import { useParams } from "react-router-dom";

function Gardener({ gardeners }) {
    const params = useParams();
    console.log(params);
    console.log(gardeners);

    return <div>Gardener</div>;
}

export default Gardener;
