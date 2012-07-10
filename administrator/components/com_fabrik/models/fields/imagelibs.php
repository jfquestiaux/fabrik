<?php
/**
 * @package     Joomla
 * @subpackage  Form
 * @copyright   Copyright (C) 2005 Fabrik. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die();

require_once JPATH_ADMINISTRATOR . '/components/com_fabrik/helpers/element.php';

/**
 * Renders availble Image Libraries
 *
 * @package     Joomla
 * @subpackage  Form
 * @since		1.5
 */

class JFormFieldImagelibs extends JFormFieldList
{
	/**
	 * Element name
	 * @access	protected
	 * @var		string
	 */
	protected $name = 'Imagelibs';

	/**
	 * Method to get the field options.
	 *
	 * @return  array  The field option objects.
	 */

	protected function getOptions()
	{
		require_once COM_FABRIK_FRONTEND . '/helpers/image.php';
		$imageLibs = FabimageHelper::getLibs();
		if (empty($imageLibs))
		{
			return JHTML::_('select.option', JText::_('NO MAGE LIBRARY FOUND'));
		}
		return $imageLibs;
	}
}
