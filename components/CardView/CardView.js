import React, { PropTypes } from 'react';

class CardView extends React.Component {
  constructor(props){
    super(props)
    const { users } = props;// eslint-disable-line no-use-before-define
    this.users = users;
  }
  componentDidMount() {
    
    var c3ChartDefaults = $().c3ChartDefaults();

  

  // Donut Chart Bottom Legend
  for(let i=0;i<this.users.length;i++){
    var donutData = {
      type : 'donut',
      columns: [
        ['Satisfied', 2],
        ['Noncompliant', i],
        ['Partial', 2],
      ],
      // onclick: function (d, i) { console.log("onclick", d, i); },
      // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    };

    var donutChartBottomConfig = c3ChartDefaults.getDefaultRelationshipDonutConfig();
    donutChartBottomConfig.bindto = '#donut-chart-'+i;
    donutChartBottomConfig.tooltip = {show: true};
    donutChartBottomConfig.data = donutData;
    donutChartBottomConfig.legend = {
      show: true,
      position: 'bottom'
    };
    donutChartBottomConfig.size = {
      width: 271,
      height: 191
    };
    donutChartBottomConfig.tooltip = {
      contents: $().pfDonutTooltipContents
    };

    // for(let i=0;i<)

    var donutChartBottomLegend = c3.generate(donutChartBottomConfig);
    $().pfSetDonutChartTitle("#donut-chart-"+i, 4+i, "Controls");
  }
  

    //run matchHeight jquery plugin
    this.matchHeight();
    this.card = $('.card-pf-view-single-select');

    // Card Single Select
    this.card.click(function() {
      if ($(this).hasClass('active'))
      { $(this).removeClass('active'); }
      else
      { $('.card-pf-view-single-select').removeClass('active'); $(this).addClass('active'); }
    });
  }

  matchHeight(){
    // matchHeight the contents of each .card-pf and then the .card-pf itself
    $(".row-cards-pf > [class*='col'] > .card-pf > .card-pf-body").matchHeight();
  }


  render() {
    
    
    return (
    <div className="row row-cards-pf">
      {this.users.map((user,i) =>
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={i}>
        <div className="card-pf card-pf-view card-pf-view-select card-pf-view-single-select" onClick={this.props.onClickFunctions===undefined? null:this.props.onClickFunctions(i)}>
          <div className="card-pf-body" style={{height: '260px'}}>
            <div className="card-pf-top-element">
              <div id={"donut-chart-"+i} className="example-donut-chart-bottom-legend"></div>
            </div>
            <h2 className="card-pf-title text-center">
              {user.name}
            </h2>
            <div className="card-pf-items text-center">
              <div className="card-pf-item">
                <span className="pficon pficon-screen"></span>
                <span className="card-pf-item-text">8</span>
              </div>
              <div className="card-pf-item">
                <span className="fa fa-check"></span>
              </div>
            </div>
            <p className="card-pf-info text-center"><strong>Created On</strong> 2017-12-24 02:00 AM <br/> Never Expires</p>
          </div>
          <div className="card-pf-view-checkbox">
            <input type="checkbox"/>
          </div>
        </div>
      </div>
      )}
    </div>
    );
  }
}

export default CardView;
