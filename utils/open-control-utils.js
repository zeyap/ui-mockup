let constants = require('../core/constants');
constants = constants.default;

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
module.exports.addStandardsControlFamilies = function(standards){
    return standards.forEachConsecutively(function(arr,i,callback){
        let _ = arr[i];
        return fetch(constants.standards_url[_.key]).then(r=>{
                if(r.url.indexOf('undefined')===-1){
                    return r.json();
                }else{
                    return null;
                }
            })
            .then(data=>{
                _=Object.assign(_,{
                    controlFamilies: 0, totalControls: 0, inheritingComponents:{}
                });
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
    // console.log(standards)
    // return new Promise((_resolve,_reject)=>{
        var standardMap={} //standard_key to index in array 'standards'
        for(let i=0;i<standards.length;i++){
            if(standardMap[standards[i].key]!==undefined)continue;
            standardMap[standards[i].key] = i;
        }
        
        return fetch(constants.get_components_url).then(r=>r.json())
        .then(components=>{
            return components.forEachConsecutively(function(arr,i,callback){
                let _ = arr[i];
                return fetch(_.url).then(r=>{
                    if(r.url.indexOf('undefined') >=0) return null;
                    else{
                        return r.json()
                    }
                })
                .then((doc)=>{
                    if(doc !== null){
                    doc.satisfies.forEach((standardItem)=>{
                        let targetStandard = standards[standardMap[caseHyphenInsensitive(standardItem.standard_key)]];
                        if(targetStandard.inheritingComponents[doc.name]===undefined){
                            targetStandard.inheritingComponents[doc.name] = _.url;
                        }
                    })
                    }
                    return callback(arr, i,callback,standards);
                    
                })
                
            })
    })
        // .catch(e=>{
        //     console.log(e)
        //     _reject('There are issues when fetching components');
        // })
    // })
}

let formatComponent = function(doc, standardsCompliance, compName){
    if(doc !== null){
        // console.log(doc)
    standardsCompliance[compName]={};
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
    let standardsCompliance={};
    
        return fetch(constants.get_components_url).then(r=>r.json())
        .then(components=>{
            return components.forEachConsecutively(function(arr,i,callback){
                let _ = arr[i];
                return fetch(_.url).then(r=>{
                    if(r.url.indexOf('undefined') >=0) return null;
                    else{
                        return r.json()
                    }
                })
                .then((doc)=>{
                    formatComponent(doc, standardsCompliance, _.name);
                    return callback(arr, i,callback,standardsCompliance);
                })
            })
        
        })
        .then(standardsCompliance=>{
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
                
                return fetch(_.url).then(r=>{
                    if(r.url.indexOf('undefined') >=0) return null;
                    else{
                        return r.json()
                    }
                }).then((doc)=>{//certification
                    
                    if(doc !== null){
                        for(let standardKey in doc.standards){
                            _.standards.push(standardKey);
                            for(let control in  doc.standards[standardKey]){
                                _.totalControls++;
                            }
                        }
                        
                        for(let componentName in standardsCompliance){
                            
                            let component = standardsCompliance[componentName];
                            let complete = 0;
                            let partial = 0;
                            let noncompliant = 0;
                            
                            for(let standardKey in component){
                                let controls = component[standardKey];
                                for(let controlKey in controls){
                                    if(doc.standards[standardKey][controlKey]!==undefined){
                                        switch(controls[controlKey].implementation_status){
                                            case 'complete':
                                            complete++;
                                            break;
                                            case 'partial':
                                            partial++;
                                            break;
                                            default:
                                            noncompliant++;
                                            break;
                                        }
                                    }
                                    
                                }
                            }

                            if(complete === _.totalControls){
                                _.completeComponents.push(componentName);
                            }else{
                                _.incompleteComponents.push({
                                    name:componentName,
                                    complete,
                                    partial,
                                    noncompliant
                                });
                            }
                        }
                    }
                    return callback(arr, i+1,callback,certifications);
                })
        });
    })
    
}

module.exports.getComponents = function(callback){
    fetch(constants.get_components_url).then(r => r.json())
      .then(data => {
        // localStorage.setItem('users',JSON.stringify(data));
        callback(data);
      })
      .catch(e => console.log(e));
}

module.exports.getComponent = function(url,name,callback){
    fetch(url).then(r=>r.json())
    .then(data=>{
        //format data
        let standardsCompliance={};
        formatComponent(data, standardsCompliance,name);
        let meta = {
            satisfied: 0,
            partial: 0,
            noncompliant: 0,
            totalControls:0
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