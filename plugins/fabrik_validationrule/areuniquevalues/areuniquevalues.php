<?php
/**
 * Are Unique values Validation Rule
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.validationrule.areuniquevalues
 * @copyright   Copyright (C) 2005-2015 fabrikar.com & Lieven Gryp - All rights reserved.
 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

namespace Fabrik\Plugins\Validation;

// No direct access
defined('_JEXEC') or die('Restricted access');

use Fabrik\Helpers\Worker;
use Fabrik\Helpers\ArrayHelper;
use Fabrik\Helpers\Text;

/**
 * Are Unique values Validation Rule
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.validationrule.areuniquevalues
 * @since       3.5
 */
class AreUniqueValues extends Validation
{
	/**
	 * Plugin name
	 *
	 * @var string
	 */
	protected $pluginName = 'areuniquevalues';

	/**
	 * Validate the elements data against the rule
	 *
	 * @param   string $data          To check
	 * @param   int    $repeatCounter Repeat group counter
	 *
	 * @return  bool  true if validation passes, false if fails
	 */

	public function validate($data, $repeatCounter)
	{
		$input        = $this->app->input;
		$elementModel = $this->elementModel;

		// Could be a drop-down with multi-values
		if (is_array($data))
		{
			$data = implode('', $data);
		}

		$params     = $this->getParams();
		$otherField = $params->get('areuniquevalues-otherfield', '');
		$listModel  = $elementModel->getListModel();
		$table      = $listModel->getTable();

		if ((int) $otherField !== 0)
		{
			$otherElementModel = $this->getOtherElement();
			$otherFullName     = $otherElementModel->getFullName(true, false);
			$otherField        = $otherElementModel->getFullName(false, false);
		}
		else
		{
			// Old fabrik 2.x params stored element name as a string
			$otherFullName = $table->get('list.db_table_name') . '___' . $otherField;
		}

		$db          = $listModel->getDb();
		$lookupTable = $db->qn($table->get('list.db_table_name'));
		$data        = $db->q($data);
		$query       = $db->getQuery(true);
		$query->select('COUNT(*)')->from($lookupTable)->where($db->qn($elementModel->getFullName(false, false)) . ' = ' . $data);
		$listModel->buildQueryJoin($query);

		if (!empty($otherField))
		{
			// $$$ the array thing needs fixing, for now just grab 0
			$formData = $elementModel->getFormModel()->formData;
			$v        = ArrayHelper::getValue($formData, $otherFullName . '_raw', ArrayHelper::getValue($formData, $otherFullName, ''));

			if (is_array($v))
			{
				$v = ArrayHelper::getValue($v, 0, '');
			}

			$query->where($db->qn($otherField) . ' = ' . $db->q($v));
		}

		/* $$$ hugh - need to check to see if we're editing a record, otherwise
		 * will fail 'cos it finds the original record (assuming this element hasn't changed)
		 * @TODO - is there a better way getting the rowid?  What if this is form a joined table?
		 */
		$rowId = $input->get('rowid');

		if (!empty($rowId))
		{
			$pk = $db->qn($table->get('list.db_primary_key'));
			$query->where($pk . ' != ' . $db->q($rowId));
		}

		$db->setQuery($query);
		$c = $db->loadResult();

		return ($c == 0) ? true : false;
	}

	/**
	 * Gets the other element model to compare this plugins element data against
	 *
	 * @return    object element model
	 */

	private function getOtherElement()
	{
		$params     = $this->getParams();
		$otherField = $params->get('areuniquevalues-otherfield');

		return Worker::getPluginManager()->getElementPlugin($otherField);
	}

	/**
	 * Gets the hover/alt text that appears over the validation rule icon in the form
	 *
	 * @return    string    label
	 */

	protected function getLabel()
	{
		$otherElementModel = $this->getOtherElement();
		$params            = $this->getParams();
		$otherField        = $params->get('areuniquevalues-otherfield');

		if ((int) $otherField !== 0)
		{
			return Text::sprintf('PLG_VALIDATIONRULE_AREUNIQUEVALUES_ADDITIONAL_LABEL', $otherElementModel->getElement()->label);
		}
		else
		{
			return parent::getLabel();
		}
	}
}
