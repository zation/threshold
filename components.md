### Components

#### lmThresholdEditor

This is a component to display/add/edit/delete thredshold.

###### API

* onSave: Must have when this component is used to add thredshold. A callback when the user saves the new thredshold during adding.
* onRemove: Must have when this component is used to edit thredshold. A callback when the user removes the thredshold during editing.
* threshold: Must have when this component is used to edit thredshold. The threshold instance which is edting by the user.
* index: Must have both for editing and adding. The index of this component in the views maybe order by a special way, for example: from time, operator, warning number and so on.

##### Example

	<div class="row">
	  <div class="col-md-12">
	    <table class="threshold-table">
	      <thead>
	      <tr>
	        <th>
	          From
	        </th>
	        <th>
	          Until
	        </th>
	        <th>
	          Comparison
	        </th>
	        <th>
	          Alerts
	        </th>
	      </tr>
	      </thead>
	      <tbody>
	      
	      <!--This is a component to add threshold-->
	      <tr data-lm-threshold-editor
	          data-on-save="onAdd"></tr>
	      
	      <!--This is a component to edit threshold-->
	      <tr data-lm-threshold-editor
	          data-on-remove="onRemove"
	          ng-repeat="threshold in thresholds.all() | orderBy: fromOrder "
	          data-index="$index"
	          data-threshold="threshold">
	      </tr>
	      
	      </tbody>
	    </table>
	  </div>
	</div>


#### lmTimeSpam

This is componenet to dynamically display time spam in the time slider.

##### API

* threshold: The threshold instance to be display.
* index: The index of this component in the views maybe order by a special way, for example: from time, operator, warning number and so on.

##### Example

	<div class="row">
	  <div class="col-md-12">
	    <div class="time-chart">
	      <ul class="time-chart-background">
	        <li>24:00</li>
	        <li>22:00</li>
	        <li>20:00</li>
	        <li>18:00</li>
	        <li>16:00</li>
	        <li>14:00</li>
	        <li>12:00</li>
	        <li>10:00</li>
	        <li>08:00</li>
	        <li>06:00</li>
	        <li>04:00</li>
	        <li>02:00</li>
	      </ul>
	      <div class="all-day-background"></div>
	      
	      <!--This is the component to dynamically display time spam-->
	      <lm-time-spam ng-repeat="threshold in thresholds.all() | orderBy: fromOrder"
	                    data-index="$index"
	                    data-threshold="threshold"></lm-time-spam>
	      
	    </div>
	  </div>
	</div>