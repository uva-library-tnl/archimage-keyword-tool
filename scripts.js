var addlnamestagscount = 0;
var whoassoctagscount = 0;
var wheresitetagscount = 0;
var themedesctagscount = 0;
var broaderthemestagscount = 0;
var narrowerthemestagscount = 0;
var whoexploringtagscount = 0;
var jargontagscount = 0;
var historytagscount = 0;
var dailyusetagscount = 0;
var conditionstagscount = 0;
var whophotographedtagscount = 0;
var whatphotographedtagscount = 0;

const $ = jQuery;

const saveToStorage = (obj, data) => {
  window.localStorage.setItem(obj, JSON.stringify(data));
};

const getFromStorage = (obj) => {
  return JSON.parse(window.localStorage.getItem(obj));
};

const initApp = () => {
  $('#tt1').val(function () {
    return getFromStorage('tt1') || null;
  });
  const addlnames = getFromStorage('addlnamestags');
  if (addlnames) {
    addlnames.map((s) => {
      addToList('addlnamestags', s);
    });
  }
  const whoassoc = getFromStorage('whoassoctags');
  if (whoassoc) {
    whoassoc.map((s) => {
      addToList('whoassoctags', s);
    });
  }
  const wheresite = getFromStorage('wheresitetags');
  if (wheresite) {
    wheresite.map((s) => {
      addToList('wheresitetags', s);
    });
  }
  const themedesc = getFromStorage('themedesctags');
  if (themedesc) {
    themedesc.map((s) => {
      addToList('themedesctags', s);
    });
  }
  const broaderthemes = getFromStorage('broaderthemestags');
  if (broaderthemes) {
    broaderthemes.map((s) => {
      addToList('broaderthemestags', s);
    });
  }
  const narrowerthemes = getFromStorage('narrowerthemestags');
  if (narrowerthemes) {
    narrowerthemes.map((s) => {
      addToList('narrowerthemestags', s);
    });
  }
  const whoexploring = getFromStorage('whoexploringtags');
  if (whoexploring) {
    whoexploring.map((s) => {
      addToList('whoexploringtags', s);
    });
  }
  const jargon = getFromStorage('jargontags');
  if (jargon) {
    jargon.map((s) => {
      addToList('jargontags', s);
    });
  }
  const history = getFromStorage('historytags');
  if (history) {
    history.map((s) => {
      addToList('historytags', s);
    });
  }
  const dailyuse = getFromStorage('dailyusetags');
  if (dailyuse) {
    dailyuse.map((s) => {
      addToList('dailyusetags', s);
    });
  }
  const conditions = getFromStorage('conditionstags');
  if (conditions) {
    conditions.map((s) => {
      addToList('conditionstags', s);
    });
  }
  const whophotographed = getFromStorage('whophotographedtags');
  if (whophotographed) {
    whophotographed.map((s) => {
      addToList('whophotographedtags', s);
    });
  }
  const whatphotographed = getFromStorage('whatphotographedtags');
  if (whatphotographed) {
    whatphotographed.map((s) => {
      addToList('whatphotographedtags', s);
    });
  }
};

const closeStartOverModal = () => {
  $('html').removeClass('is-clipped');
  $('#startover-modal').removeClass('is-active');
};

const closeRemoveItemModal = () => {
  $('html').removeClass('is-clipped');
  $('#removeitem-modal').removeClass('is-active');
  $('#removeitem-conf').data('caller', '');
};

const createListItem = (obj, data) => {
  const template = document.querySelector('#cloud-item').content.cloneNode(true);
  const div = template.querySelector('.control');
  const item = template.querySelector('.list-item-data');
  window[obj + 'count']++;
  div.id = obj + window[obj + 'count'];
  item.textContent = data;
  return template;
};

const addToList = (obj, data) => {
  const id = `#${obj}`;
  const template = createListItem(obj, data);
  $(id).append(template);
  updateList(obj);
};

const updateList = (obj) => {
  const id = `#${obj}`;
  const items = [];
  $(id).find('.list-item-data').each(function () {
    items.push($(this).text());
  });

  saveToStorage(obj, items);
};

const updateTerms = () => {
  const items = [];
  $('.tags span.is-black').each(function () {
    items.push({ id: $(this).attr('data-origid'), text: $(this).text() });
  });

  saveToStorage('searchterms', items);
};

const disableTag = (obj) => {
  obj.addClass('has-background-success-dark');
  obj.addClass('is-disabled');
  obj.siblings().addClass('is-disabled');
};

const enableTag = (obj) => {
  $(`#${obj} .tag`).removeClass('is-disabled');
  $(`#${obj} .tag`).removeClass('has-background-success-dark');
};

/* ------------------------------------------------------------------------ */

const prepPDF = () => {
  const sn = getFromStorage('studentname');
  const cn = getFromStorage('coursename');

  $('#pdfinfo-modal').addClass('is-active');
  $('html').addClass('is-clipped');
  $('#studentnamefield').val(sn || '');
  $('#coursenamefield').val(cn || '');
};

const createPDF = (combined = false) => {
  const tt1 = getFromStorage('tt1');
  const tt2 = getFromStorage('tt2');
  const tt3MI = getFromStorage('tt2');
  const tt3Syn = getFromStorage('synonymtags');
  const tt3Peo = getFromStorage('whoassoctags');
  const tt3Pla = getFromStorage('wheresitetags');
  const tt3Dat = getFromStorage('themedesctags');
  const tt3Msc = getFromStorage('broaderthemestags');
  const tt4 = getFromStorage('searchterms');

  if (!combined && !(tt1 && tt2 && tt3MI && tt3Syn && tt3Peo && tt3Pla && tt3Dat && tt4)) {
    bulmaToast.toast({
      message: "You haven't completed all the steps.",
      type: 'is-danger',
      duration: 3000,
      position: 'center',
      animate: { in: 'fadeIn', out: 'fadeOut' }
    });
    return;
  } else if (!(tt1 && tt2 && tt3Msc && tt4)) { // combined version
    bulmaToast.toast({
      message: "You haven't completed all the steps.",
      type: 'is-danger',
      duration: 3000,
      position: 'center',
      animate: { in: 'fadeIn', out: 'fadeOut' }
    });
    return;
  }

  const sn = getFromStorage('studentname');
  const cn = getFromStorage('coursename');

  $('#studentname').text(sn || '');
  $('#coursename').text(cn || '');

  $('#pdf1 .pdfinsert').html(tt1);
  $('#pdf2 .pdfinsert').text(tt2);
  $('#pdf-mainidea .pdfinsert').html(`<h2>${tt3MI}</h2>`);

  if (!combined) {
    $('#pdf-addlnames .pdfinsert').html(tt3Syn.map(tt => {
      return `<span class='tag'>${tt}</span>`;
    }));
    $('#pdf-whoassoc .pdfinsert').html(tt3Peo.map(tt => {
      return `<span class='tag'>${tt}</span>`;
    }));
    $('#pdf-wheresite .pdfinsert').html(tt3Pla.map(tt => {
      return `<span class='tag'>${tt}</span>`;
    }));
    $('#pdf-themedesc .pdfinsert').html(tt3Dat.map(tt => {
      return `<span class='tag'>${tt}</span>`;
    }));
  }
  $('#pdf-broaderthemes .pdfinsert').html(tt3Msc.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));

  $('#pdf4 .pdfinsert').html(tt4.map(st => st.text).map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));

  const element = document.getElementById('pdf');
  var opt = {
    margin: 0,
    filename: 'thinkingtool.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf()
    .set(opt)
    .then(() => {
      $('#pdf').show();
    })
    .from(element)
    .save()
    .then(() => {
      $('#pdf').hide();
    });
};

const closePDFInfoModal = () => {
  $('html').removeClass('is-clipped');
  $('#pdfinfo-modal').removeClass('is-active');
};

$(document).ready(function () {
  initApp();

  /**
   * Save assignment info to storage
   */
  $('#tt1').on('input', function () {
    saveToStorage('tt1', $(this).val());
  });

  /**
   * Set main idea in cloud from step 2 and save to storage
   */
  $('#tt2').on('input', function () {
    $('#mainidea').text($(this).val());
    saveToStorage('tt2', $(this).val());
  });

  /**
   * React to start over button being clicked. Pop up warning.
   */
  $('#startover').on('click', function () {
    $('#startover-modal').addClass('is-active');
    $('html').addClass('is-clipped');
  });

  /**
   * On confirmation of starting over,
   * clear storage and reload page.
   */
  $('#startover-conf').on('click', function () {
    window.localStorage.clear();
    closeStartOverModal();
    (async function () { window.scrollTo(0, 0); })()
      .then(() => {
        window.location.href = '';
      });
  });

  /**
   * User cancelled start over
   */
  $('#startover-cancel').on('click', function () {
    closeStartOverModal();
  });

  $('.field.has-addons .control .button').on('click', function () {
    $(this).parent().siblings('.control').find('input').focus();
  });

  $('#addlnames input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('synonymtags', p.trim());
      });
    } else {
      addToList('synonymtags', $(this).val());
    }
    $(this).val('');
  });

  $('#whoassoc input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('whoassoctags', p.trim());
      });
    } else {
      addToList('whoassoctags', $(this).val());
    }
    $(this).val('');
  });

  $('#wheresite input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('wheresitetags', p.trim());
      });
    } else {
      addToList('wheresitetags', $(this).val());
    }
    $(this).val('');
  });

  $('#themedesc input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('themedesctags', p.trim());
      });
    } else {
      addToList('themedesctags', $(this).val());
    }
    $(this).val('');
  });

  $('#broaderthemes input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('broaderthemestags', p.trim());
      });
    } else {
      addToList('broaderthemestags', $(this).val());
    }
    $(this).val('');
  });

  /**
   * Allows removal of an item once added.
   * Modals used to confirm deletion.
   */
  $('.mitags, .tttags').on('click', '.is-delete', function () {
    $('#removeitem-conf').attr('data-caller', $(this).closest('.control').attr('id'));
    $('html').addClass('is-clipped');
    $('#removeitem-modal').addClass('is-active');
  });

  $('#removeitem-conf').on('click', function () {
    const id = $(this).attr('data-caller');
    const tagGroup = $('#' + id);
    const parent = $(tagGroup).closest('.mitags, .tttags').attr('id');
    $(tagGroup).remove();
    updateList(parent);
    closeRemoveItemModal();
  });

  $('#removeitem-cancel').on('click', function () {
    closeRemoveItemModal();
  });

  /**
   * Add brainstorm items to search terms when clicked.
   * n.b. Only 4 total can be added
   */
  $('.tttags').on('click', '.list-item-data', function () {
    const data = $(this).text();
    const id = $(this).closest('.control').attr('id');
    if ($('#searchterms .tags').length <= 3) {
      addToSearchTerms(id, data);
      disableTag($(this));
    } else {
      bulmaToast.toast({
        message: 'Try removing some search terms first.',
        type: 'is-danger',
        duration: 3000,
        position: 'center',
        animate: { in: 'fadeIn', out: 'fadeOut' }
      });
    }
  });

  /**
   * Remove search terms when delete button clicked
   */
  $('#searchterms').on('click', '.tags a.is-delete', function () {
    const origid = $(this).siblings('.tag').attr('data-origid');
    enableTag(origid);
    $(this).closest('.control').remove();
    updateTerms();
  });

  /**
   * Toggle menu on mobile when hamburger clicked
   */
  $('.navbar-burger').on('click', function () {
    $('.navbar-menu').toggle();
  });

  /**
   * Stop user from completing Step 2 prior to 1 being finished.
   */
  $('#tt2').on('focus', function () {
    if (!($('#tt1').val())) {
      bulmaToast.toast({
        message: 'Step 1 should be completed before brainstorming ideas.',
        type: 'is-danger',
        duration: 3000,
        position: 'center',
        animate: { in: 'fadeIn', out: 'fadeOut' }
      });
      $('#tt1').focus();
    }
  });

  /**
   * Stop user from completing Step 3 prior to 1 & 2 being finished.
   */
  $('.panel-block input').on('focus', function () {
    const steps12Complete = ($('#tt1').val() && $('#tt2').val() !== MI_PLACEHOLDER);
    if (!steps12Complete) {
      bulmaToast.toast({
        message: 'Both Steps 1 and 2 should be completed before filling out the concept cloud.',
        type: 'is-danger',
        duration: 3000,
        position: 'center',
        animate: { in: 'fadeIn', out: 'fadeOut' }
      });
      $(this).blur();
    }
  });

  $('#savepdf').on('click', function () {
    prepPDF();
  });

  $('#pdfinfo-conf').on('click', function () {
    const sn = $('#studentnamefield').val();
    const cn = $('#coursenamefield').val();

    saveToStorage('studentname', sn);
    saveToStorage('coursename', cn);
    closePDFInfoModal();
    if (window.location.pathname.includes('combined')) {
      createPDF(true);
    } else {
      createPDF();
    }
  });

  $('#pdfinfo-cancel').on('click', function () {
    closePDFInfoModal();
  });
});
