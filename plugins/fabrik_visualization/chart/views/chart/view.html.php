<?php
/**
 * Fabrik Google Chart HTML View
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.visualization.chart
 * @copyright   Copyright (C) 2005-2015 fabrikar.com - All rights reserved.
 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

// No direct access
defined('_JEXEC') or die('Restricted access');

use Fabrik\Helpers\Worker;
use Fabrik\Helpers\HTML;
use Fabrik\Helpers\Text;

jimport('joomla.application.component.view');

/**
 * Fabrik Google Chart HTML View
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.visualization.chart
 * @since       3.0
 */

class FabrikViewChart extends JViewLegacy
{
	/**
	 * Execute and display a template script.
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @throws Exception
	 *
	 * @return  mixed  A string if successful, otherwise a JError object.
	 */
	public function display($tpl = 'default')
	{
		$app = JFactory::getApplication();
		$input = $app->input;
		$scripts = HTML::framework();
		$scripts[] = 'media/com_fabrik/js/listfilter.js';
		$scripts[] = 'media/com_fabrik/js/advanced-search.js';
		$model = $this->getModel();
		$usersConfig = JComponentHelper::getParams('com_fabrik');
		$model->setId($input->getInt('id', $usersConfig->get('visualizationid', $input->getInt('visualizationid', 0))));
		$this->row = $model->getItem();

		if (!$model->canView())
		{
			echo Text::_('JERROR_ALERTNOAUTHOR');

			return false;
		}

		if ($this->row->published == 0)
		{
			throw new Exception(Text::_('JERROR_ALERTNOAUTHOR'));
		}

		$this->requiredFiltersFound = $this->get('RequiredFiltersFound');

		if ($this->requiredFiltersFound)
		{
			$this->chart = $this->get('Chart');
		}
		else
		{
			$this->chart = '';
		}

		$params = $model->getParams();
		$this->params = $params;
		$pluginManager = Worker::getPluginManager();
		$pluginManager->getPlugIn('chart', 'visualization');
		$this->containerId = $this->get('ContainerId');
		$this->filters = $this->get('Filters');
		$this->showFilters = $model->showFilters();
		$this->filterFormURL = $this->get('FilterFormURL');

		$tpl = $params->get('chart_layout', $tpl);
		$tmplpath = JPATH_ROOT . '/plugins/fabrik_visualization/chart/views/chart/tmpl/' . $tpl;
		$this->_setPath('template', $tmplpath);
		HTML::stylesheetFromPath('plugins/fabrik_visualization/chart/views/chart/tmpl/' . $tpl . '/template.css');

		// Assign something to Fabrik.blocks to ensure we can clear filters
		$ref = $model->getJSRenderContext();
		$js = "$ref = {};";
		$js .= "\n" . "Fabrik.addBlock('$ref', $ref);";
		$js .= $model->getFilterJs();

		HTML::iniRequireJs($model->getShim());
		HTML::script($scripts, $js);
		echo parent::display();
	}
}
