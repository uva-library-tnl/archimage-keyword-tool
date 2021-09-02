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
  const tt1a = getFromStorage('tt1');
  const tt1b = getFromStorage('synonymtags');
  const tt1c = getFromStorage('whoassoctags');
  const tt1d = getFromStorage('wheresitetags');
  const tt2a = getFromStorage('themedesctags');
  const tt2b = getFromStorage('broaderthemestags');
  const tt2c = getFromStorage('narrowerthemestags');
  const tt2d = getFromStorage('whoexploringtags');
  const tt2e = getFromStorage('jargontags');
  const tt3a = getFromStorage('historytags');
  const tt3b = getFromStorage('dailyusetags');
  const tt3c = getFromStorage('conditionstags');
  const tt3d = getFromStorage('whophotographedtags');
  const tt3e = getFromStorage('whatphotographedtags');

  // if (!combined && !(tt1 && tt2 && tt3MI && tt3Syn && tt3Peo && tt3Pla && tt3Dat && tt4)) {
  //   bulmaToast.toast({
  //     message: "You haven't completed all the steps.",
  //     type: 'is-danger',
  //     duration: 3000,
  //     position: 'center',
  //     animate: { in: 'fadeIn', out: 'fadeOut' }
  //   });
  //   return;
  // } else if (!(tt1 && tt2 && tt3Msc && tt4)) { // combined version
  //   bulmaToast.toast({
  //     message: "You haven't completed all the steps.",
  //     type: 'is-danger',
  //     duration: 3000,
  //     position: 'center',
  //     animate: { in: 'fadeIn', out: 'fadeOut' }
  //   });
  //   return;
  // }

  const sn = getFromStorage('studentname');
  const cn = getFromStorage('coursename');

  $('#studentname').text(sn || '');
  $('#coursename').text(cn || '');

  $('#pdf-tt1 .pdfinsert').html(tt1a);

  // if (!combined) {
  $('#pdf-addlnames .pdfinsert').html(tt1b.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-whoassoc .pdfinsert').html(tt1c.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-wheresite .pdfinsert').html(tt1d.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-themedesc .pdfinsert').html(tt2a.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  // }
  $('#pdf-broaderthemes .pdfinsert').html(tt2b.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-narrowerthemes .pdfinsert').html(tt2c.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-whoexploring .pdfinsert').html(tt2d.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-jargon .pdfinsert').html(tt2e.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-history .pdfinsert').html(tt3a.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-dailyuse .pdfinsert').html(tt3b.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-conditions .pdfinsert').html(tt3c.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-whophotographed .pdfinsert').html(tt3d.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));
  $('#pdf-whatphotographed .pdfinsert').html(tt3e.map(tt => {
    return `<span class='tag'>${tt}</span>`;
  }));

  const element = document.getElementById('pdf');
  var opt = {
    margin: 0,
    filename: 'arch-keyword-tool.pdf',
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
        addToList('addlnamestags', p.trim());
      });
    } else {
      addToList('addlnamestags', $(this).val());
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

  $('#narrowerthemes input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('narrowerthemestags', p.trim());
      });
    } else {
      addToList('narrowerthemestags', $(this).val());
    }
    $(this).val('');
  });

  $('#whoexploring input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('whoexploringtags', p.trim());
      });
    } else {
      addToList('whoexploringtags', $(this).val());
    }
    $(this).val('');
  });

  $('#jargon input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('jargontags', p.trim());
      });
    } else {
      addToList('jargontags', $(this).val());
    }
    $(this).val('');
  });

  $('#history input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('historytags', p.trim());
      });
    } else {
      addToList('historytags', $(this).val());
    }
    $(this).val('');
  });

  $('#dailyuse input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('dailyusetags', p.trim());
      });
    } else {
      addToList('dailyusetags', $(this).val());
    }
    $(this).val('');
  });

  $('#conditions input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('conditionstags', p.trim());
      });
    } else {
      addToList('conditionstags', $(this).val());
    }
    $(this).val('');
  });

  $('#whophotographed input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('whophotographedtags', p.trim());
      });
    } else {
      addToList('whophotographedtags', $(this).val());
    }
    $(this).val('');
  });

  $('#whatphotographed input').on('change', function () {
    const pieces = $(this).val().split(',');
    if (pieces.length > 2) {
      pieces.map((p) => {
        addToList('whatphotographedtags', p.trim());
      });
    } else {
      addToList('whatphotographedtags', $(this).val());
    }
    $(this).val('');
  });

  /**
   * Allows removal of an item once added.
   * Modals used to confirm deletion.
   */
  $('.mi-tags, .tt-tags').on('click', '.is-delete', function () {
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
   * Toggle menu on mobile when hamburger clicked
   */
  $('.navbar-burger').on('click', function () {
    $('.navbar-menu').toggle();
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
