import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SBRPSkillsAPI } from '../../../../apis/sbrpSkillsAPI';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import EditSkillForm from '../../../../components/EditSkillForm.jsx'; 

export default function EditSkill() {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);
  
    useEffect(() => {
        SBRPSkillsAPI.get(id).then((fetchedSkill) => {
            setSkill(fetchedSkill);
        });
    }, []);
  
    return (
      <Box>
        { !skill 
          ? <Skeleton variant="rectangular" width={210} height={118} /> 
          : <EditSkillForm skill={skill} />
        }
      </Box>
    );
  }