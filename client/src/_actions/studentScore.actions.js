import { useRecoilState } from 'recoil';
import moment from 'moment';

import {useFetchWrapper} from '_helpers';
import {scoreAtom, alertBachAtom} from '_state';

export{ useStudentScoreAction };

function useStudentScoreAction (param) {
    const fetchWrapper = useFetchWrapper();
    const [score, setScore] = useRecoilState(scoreAtom);
    const [alert, setAlert] = useRecoilState(alertBachAtom);

    async function getScoreList(Class){
        console.log("get student list called from studentInfo-action");
        const response = await fetchWrapper.get(`http://localhost:3000/api/classes/${Class.class_id}/members/scores`, null, null);
        if (response == null) {
            console.log("No response.");
            return null;
        }
        response.json().then(rawjson => { 
            console.log(rawjson);
            setScoreData (rawjson);
            return rawjson;
          }); 
    }

    function setScoreData (rawjson) {
        let data = rawjson.message
        setScore(data);
    }

    function handleData(data) {
        var refinedData = [];
        data.forEach(object => {
            var tempLevel = { Cplus: 0, C: 0, Dplus:0, D:0, F:0 }
            var vnu_id = object.user_ref.vnu_id;
            var name = object.user_ref.name;
            var scoreObj = object.scores;  
            var CPA = 0;
            var totalCredit = 0;
            var totalScore = 0;
            var date_of_birth = object.user_ref.date_of_birth = moment.utc(object.user_ref.date_of_birth).format("DD/MM/YYYY");
            
            scoreObj.forEach(scoreElement => { 
                var score = scoreElement.score / 10 * 4;
                totalCredit += scoreElement.subject.credits_number;
                totalScore += scoreElement.subject.credits_number*scoreElement.score;  
                tempLevel.Cplus = (score<=2.5 && score>2) ? tempLevel.Cplus + 1 : tempLevel.Cplus;
                tempLevel.C = (score<=2 && score>1.5) ? tempLevel.C + 1 : tempLevel.C;
                tempLevel.Dplus =  (score<=2 && score>1.5) ? tempLevel.Dplus + 1 : tempLevel.Dplus;
                tempLevel.D =  (score<=1.5 && score>=1) ? tempLevel.D + 1 : tempLevel.D;
                tempLevel.F = (score<1 && score>0) ? tempLevel.F + 1 : tempLevel.F;          
            });
            CPA = ((totalScore/totalCredit)/10*4).toFixed(2); 
            var state = (CPA > 2.5) ? ['Bình thường'] : ['Cảnh cáo'];
            state = (CPA < 1) ? ['Đuổi học'] : state;

            refinedData.push({
                vnu_id: vnu_id,
                name: name,
                date_of_birth: date_of_birth,
                cpa: CPA,
                tags: state,
                Cplus: tempLevel.Cplus,
                C: tempLevel.C,
                Dplus: tempLevel.Dplus,
                D: tempLevel.D,
                F: tempLevel.F,
            })
        });
        return refinedData
    }

    return {
        getScoreList : getScoreList,
        handleData : handleData,
    }
}
