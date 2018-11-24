let constants = require('../core/constants');
constants = constants.default;
let axios = require('axios');

/**
* A helper function to loop through an array and output Promise object
* @author zeyap
*/


Array.prototype.forEachConsecutively = function(fn){
    let that = this;
    let callback = function(arr,i,callback,memo){
        if(i<arr.length-1){
            return fn(arr, i+1,callback);
        }else{
            return memo;
        }
    }
    return fn(that,0,callback);
}

/**
* Request controls of all standards and add to 'standards' array
* @author zeyap
*/

var formatStandard = function(standard){
    if(standard.length==0)return {};
    let formatted = {
        name:standard[0].standardName
    };
    for(let i=0;i<standard.length;i++){
        formatted[standard[i].controls[0].controlName] = standard[i].controls[0].controlInfo;
        if(formatted[standard[i].controls[0].controlName].desc){
            formatted[standard[i].controls[0].controlName].description = formatted[standard[i].controls[0].controlName].desc;
            delete formatted[standard[i].controls[0].controlName].desc;
        }
    }
    return formatted;
}

module.exports.addStandardsControlFamilies = function(standards){
    return standards.forEachConsecutively(function(arr,i,callback){
        let _ = arr[i];
        _=Object.assign(_,{
            controlFamilies: 0, totalControls: 0, inheritingComponents:{}
        });
        if(constants.standards_url[_.key]===undefined){
            return callback(arr, i,callback,standards);
        }else return axios.get(constants.standards_url[_.key]).then(r=>{
                return formatStandard(r.data);
            })
            .then(data=>{
                if(data !== null) {
                    
                    let prevControl = undefined;
                    for(let control in data){
                        if(control==='name'||control==='description'||control==='key')continue;
                        if(data[control].family!==prevControl){
                            _.controlFamilies++;
                            prevControl = data[control].family;
                        }
                        _.totalControls++;
                    }
                }
                // console.log(i, arr.length-1)
                return callback(arr, i,callback,standards);
            })
    })
}


/**
* For standards.json and components files having keys that are slightly different but referring to the same standard
* TODO: complete this function
*/

var caseHyphenInsensitive = function(key){
    if(key == 'NIST-800-53'){
        return 'NIST 800-53';
    }
    // if(key == )
    return key;
}

/**
* Request compliance data from components and add to 'standards' array
* @author zeyap
*/
module.exports.getStandardsComplianceData = function(standards){

    var standardMap={} //standard_key to index in array 'standards'
    for(let i=0;i<standards.length;i++){
        if(standardMap[standards[i].key]!==undefined)continue;
        standardMap[standards[i].key] = i;
    }
    
    return getComponents(components=>{
        return components.forEachConsecutively(function(arr,i,callback){
            let _ = arr[i];
            return fetch(_.url).then(r=>{
                if(_.url===undefined||_.url==='session') return null;
                else{
                    return r.json()
                }
            })
            .then((doc)=>{
                if(_.url == 'session'){
                    let userData = JSON.parse(sessionStorage.getItem('user'));
                    doc = {
                        documentation_complete:false,
                        name:userData.username+"'s Component",
                        satisfies: [],
                        schema_version:''
                    };
                    return axios.get(constants.remote_address+constants.getAllStandardsControls)
                    .then(r=>{
                        let controls = r.data;
                        controls.sort((a,b)=>{
                            if(a.controls[0].controlName === b.controls[0].controlName)return 0;
                            else if(a.controls[0].controlName > b.controls[0].controlName)return 1;
                            else return -1;
                        })
                        for(let i=0;i<userData.compliance.length;i++){
                            let target = userData.compliance[i].Control;
                            let found = controls[search(controls.map(c=>c.controls[0].controlName),target)];

                            doc.satisfies.push({
                                control_key: target,
                                covered_by: [],
                                implementation_status: ((status)=>{
                                    let ans = 'not applicable';
                                    switch(status){
                                        case 1:
                                        ans='complete';
                                        break;
                                        case 2:
                                        ans='partial';
                                        break;
                                        case 3:
                                        case 4:
                                        case 5:
                                        case 6:
                                        default:
                                        if(status===3){
                                            ans='planned';
                                        }else if(status ===4){
                                            ans='none';
                                        }else if(status===5){
                                            ans='implemented';
                                        }else if(status===6){
                                            ans='unknown';
                                        }else if(status===7){
                                            ans='not applicable';
                                        }
                                        break;
                                    }
                                    return ans;
                                })(userData.compliance[i].Status),
                                narrative: [{text:found.controls[0].controlInfo.desc}],
                                standard_key: found.standardName
                            })
                        }
                        // console.log(doc)
                        doc.satisfies.forEach((standardItem)=>{
                            let targetStandard = standards[standardMap[caseHyphenInsensitive(standardItem.standard_key)]];
                            if(targetStandard.inheritingComponents[doc.name]===undefined){
                                targetStandard.inheritingComponents[doc.name] = _.url;
                            }
                        })
                        return callback(arr, i,callback,standards);

                    });
                }//url!=='session'
                else if(doc !== null){
                    // console.log(doc)
                    doc.satisfies.forEach((standardItem)=>{
                        let targetStandard = standards[standardMap[caseHyphenInsensitive(standardItem.standard_key)]];
                        if(targetStandard.inheritingComponents[doc.name]===undefined){
                            targetStandard.inheritingComponents[doc.name] = _.url;
                        }
                    })
                    return callback(arr, i,callback,standards);
                }

                return callback(arr, i,callback,standards);
                
                
            })
            
        })
    })
}

let formatComponent = function(doc, standardsCompliance, compName){
    if(doc !== null){
        // console.log(doc)
    let component=standardsCompliance[compName];
        doc.satisfies.forEach((item)=>{
            component[item["standard_key"]] = component[item["standard_key"]]||{};
            let standard = component[item["standard_key"]];
            let control = item["control_key"];
            let status = item["implementation_status"];
            standard[control] = {};
            standard[control] = Object.assign(standard[control],item);
        })
    }
}


module.exports.getCertificationCompliance = function(certifications){
    return certifications.forEachConsecutively(function(arr,i,callback){
        let _ = arr[i];
        if(_.satisfied===undefined){
            _ = Object.assign(_,{
                controlFamilies: 0, totalControls: 0, 
                standards:[],
                completeComponents: [],
                incompleteComponents: []
            })
        }
        
        if(_.url===undefined){
            return callback(arr, i+1,callback,certifications);
        }else return axios.get(constants.remote_address+_.url).then(r=>{
            return r.data;
        }).then((cert)=>{//certification
        
            if(cert !== null){
                const doc = cert[0];
                // console.log(doc)
                _.totalControls = doc.controls.length;

                // getComponents((components)=>{
                //     for(let j=0;j<components.length;j++){
                //         if(components[j].url=='session' && components[j].compliance){

                //         }
                //     }
                    
                // })
                const userData = JSON.parse(sessionStorage.getItem('user'));
                const compliance = userData.compliance;
                const componentName = userData.username+"'s Component";
                if(compliance === null) return callback(arr, i+1,callback,certifications);
                let complianceMap = {};
                for(let i=0;i<compliance.length;i++){
                    complianceMap[compliance[i].Control] = compliance[i].Status;
                }

                let complete = 0;
                let partial = 0;
                let noncompliant = 0;

                let completeComponentsMap = {};
                let incompleteComponentsMap = {};

                for(let i=0;i<doc.controls.length;i++){
                    
                    let status = complianceMap[doc.controls[i]];
                    if(status === undefined)continue;

                    switch(status){
                        case 1:
                        complete++;
                        break;
                        case 2:
                        partial++;
                        break;
                        default:
                        noncompliant++;
                        break;      
                    }

                    if(complete === _.totalControls){
                        completeComponentsMap[componentName];
                    }else{
                        incompleteComponentsMap[componentName] = {
                            name:componentName,
                            complete,
                            partial,
                            noncompliant
                        };
                    }
                }
                _.completeComponents = Object.keys(completeComponentsMap).map((k)=>completeComponentsMap[k]);
                _.incompleteComponents = Object.keys(incompleteComponentsMap).map((k)=>incompleteComponentsMap[k]);
            }
            return callback(arr, i+1,callback,certifications);
        })
    });
    
}

var getComponents = function(callback){
    return fetch(constants.get_components_url)
    .then(r => r.json())
      .then(data => {
          const user=JSON.parse(sessionStorage.getItem('user'));
          data.forEach((d)=>{d.viewOnly=true;});
          data.push({
              name: user.username+"'s Component",
              url:'session',
              compliance: user.compliance,
              viewOnly: false
          })
        return callback(data);
      })
      .catch(e => console.log(e));
}

module.exports.getComponents = getComponents;

var search = function(ascendArr,target){
    let l=0, r = ascendArr.length-1, mid = Math.floor((l+r)/2);
    while(l<r){
        if(ascendArr[mid] === target){
            return mid;
        }else if(ascendArr[mid] < target){
            l = mid+1;
        }else {
            r = mid-1;
        }
        mid = Math.floor((l+r)/2);
    }

    return mid;
}

module.exports.getComponent = function(comp,callback){
    let standardsCompliance={};
    standardsCompliance[comp.name]={};
    if(comp.url==='session'){
        if(comp.compliance===undefined){
            comp.compliance = JSON.parse(sessionStorage.getItem('user')).compliance;
        }
        // TODO:
        axios.get(constants.remote_address+constants.getAllStandardsControls)
        .then(r=>{
            let controls = r.data;
            controls.sort((a,b)=>{
                if(a.controls[0].controlName === b.controls[0].controlName)return 0;
                else if(a.controls[0].controlName > b.controls[0].controlName)return 1;
                else return -1;
            })
            for(let i=0;i<comp.compliance.length;i++){
                let target = comp.compliance[i].Control;
                let found = controls[search(controls.map(c=>c.controls[0].controlName),target)];
                if(standardsCompliance[comp.name][found.standardName]===undefined){
                    standardsCompliance[comp.name][found.standardName]={
                        satisfied: 0,
                        partial: 0,
                        noncompliant: 0,
                        totalControls:0,
                        viewOnly: comp.viewOnly
                    };
                }
                
                standardsCompliance[comp.name][found.standardName][target] = {
                    control_key: target,
                    covered_by: [],
                    implementation_status: ((status)=>{
                        let ans = 'not applicable';
                        switch(status){
                            case 1:
                            ans='complete';
                            standardsCompliance[comp.name][found.standardName].satisfied++;
                            break;
                            case 2:
                            ans='partial';
                            standardsCompliance[comp.name][found.standardName].partial++;
                            break;
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            default:
                            if(status===3){
                                ans='planned';
                            }else if(status ===4){
                                ans='none';
                            }else if(status===5){
                                ans='implemented';
                            }else if(status===6){
                                ans='unknown';
                            }else if(status===7){
                                ans='not applicable';
                            }
                            standardsCompliance[comp.name][found.standardName].noncompliant++;
                            break;
                        }
                        standardsCompliance[comp.name][found.standardName].totalControls++;
                        return ans;
                    })(comp.compliance[i].Status),
                    narrative: [{text:found.controls[0].controlInfo.desc}],
                    standard_key: found.standardName
                }
            }
            // console.log(standardsCompliance[comp.name])
            callback(standardsCompliance[comp.name]);
        })
        return;
    }

    let [url,name] = [comp.url,comp.name];
    fetch(url).then(r=>r.json())
    .then(data=>{
        //format data
        formatComponent(data, standardsCompliance,name);
        let meta = {
            satisfied: 0,
            partial: 0,
            noncompliant: 0,
            totalControls:0,
            viewOnly: comp.viewOnly
        };
        for(let standardKey in standardsCompliance[name]){
            // Assume content has been though validation, no need for
            // validating implementation_status (e.g. Complete vs complete vs COMPLETE)
            let standard = standardsCompliance[name][standardKey];
            for(let item in standard){
                meta.totalControls++;
                switch(standard[item].implementation_status){
                    case 'complete':
                    meta.satisfied++;
                    break;
                    case 'partial':
                    meta.partial++;
                    break;
                    default:
                    meta.noncompliant++;
                    break;
                }
            }
            standard = Object.assign(standard,meta);
        }
        callback(standardsCompliance[name]);
    })
    .catch(e=>console.log(e));
}