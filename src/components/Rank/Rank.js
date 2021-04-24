import React from 'react';

const Rank = ({name, entries}) =>{
return(
<div>
<div className="black f2 b center">
    {`${name}, your current entry count is...`} 
</div>
<div className="black f3 b center">
    {entries}
</div>
</div>
)
}

export default Rank