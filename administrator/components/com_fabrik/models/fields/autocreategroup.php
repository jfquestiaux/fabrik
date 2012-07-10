<?php
/**
 * @package     Joomla
 * @subpackage  Form
 * @copyright   Copyright (C) 2005 Fabrik. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */


// Check to ensure this file is within the rest of the framework
defined('JPATH_BASE') or die();

require_once JPATH_ADMINISTRATOR . '/components/com_fabrik/helpers/element.php';

/**
 * Renders an eval element
 *
 * @package     Joomla
 * @subpackage  Form
 * @since		1.5
 */

class JFormFieldAutoCreateGroup extends JFormFieldRadio
{
	/**
	 * Element name
	 * @var		string
	 */
	protected $name = 'AutoCreateGroup';

	/**
	 * Method to get the radio button field input markup.
	 *
	 * @return  string  The field input markup.
	 */

	protected function getInput()
	{
		$this->value = $this->form->getValue('id') == 0 ? 1 : 0;
		return parent::getInput();
	}
}
