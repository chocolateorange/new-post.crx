'use strict';

const {
  loadValues,
  saveValues,
} = require('./storage');

const {
  createNewURI,
} = require('./text');

//------------------------------------------------------------------------------

const accountInput     = document.getElementById('js-account'),
      repositoryInput  = document.getElementById('js-repository'),
      branchInput      = document.getElementById('js-branch'),
      pathInput        = document.getElementById('js-path'),
      templateTextArea = document.getElementById('js-template'),
      previewInput     = document.getElementById('js-preview');

/**
 * event handler for change input values
 */
function updatePreviewInput() {
  previewInput.value = createNewURI({
    account: accountInput.value,
    repository: repositoryInput.value,
    branch: branchInput.value,
    path: pathInput.value,
    template: templateTextArea.value,
  }, new Date(), 1);
}

accountInput.addEventListener('input', updatePreviewInput, false);
repositoryInput.addEventListener('input', updatePreviewInput, false);
branchInput.addEventListener('input', updatePreviewInput, false);
pathInput.addEventListener('input', updatePreviewInput, false);
templateTextArea.addEventListener('input', updatePreviewInput, false);

//------------------------------------------------------------------------------

const revertButton = document.getElementById('js-revert'),
      saveButton   = document.getElementById('js-save');

/**
 * event handler for click revert button
 */
async function onClickRevert() {
  revertButton.disabled = true;

  const {
    account = '',
    repository = '',
    branch = '',
    path = '',
    template = '',
  } = await loadValues();

  accountInput.value = account;
  repositoryInput.value = repository;
  branchInput.value = branch;
  pathInput.value = path;
  templateTextArea.value = template;

  revertButton.disabled = false;
}

/**
 * event handler for click save button
 */
async function onClickSave() {
  saveButton.disabled = true;

  await saveValues({
    account: accountInput.value,
    repository: repositoryInput.value,
    branch: branchInput.value,
    path: pathInput.value,
    template: templateTextArea.value,
  });

  saveButton.disabled = false;
}

revertButton.addEventListener('click', onClickRevert, false);
saveButton.addEventListener('click', onClickSave, false);

//------------------------------------------------------------------------------

/**
 * event handler for DOMContentLoaded
 */
async function onDOMContentLoaded() {
  const {
    account = '',
    repository = '',
    branch = '',
    path = '',
    template = '',
  } = await loadValues();

  accountInput.value = account;
  repositoryInput.value = repository;
  branchInput.value = branch;
  pathInput.value = path;
  templateTextArea.value = template;

  previewInput.value = createNewURI({
    account,
    repository,
    branch,
    path,
    template,
  }, new Date(), 1);
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
